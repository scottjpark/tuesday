import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk('/api/users/register/', async (userData, thunkAPI) => {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post('/api/users/register/', userData, config)
        if (response.status === 201) {
            const { dispatch } = thunkAPI
            dispatch(login(userData))

            return response.data
        } else {
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const login = createAsyncThunk('/api/users/token/', async (userData, thunkAPI) => {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post('/api/users/token/', userData, config)
        if (response.status === 200) {
            const access = response.data.access

            const { dispatch } = thunkAPI
            dispatch(getUser(access))

            return { success: 'Successfully logged in' }
        } else {
            return { failure: 'Something went wrong' }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const logout = createAsyncThunk('/api/users/logout/', async (_, thunkAPI) => {
    try {
        const response = await axios.post('/api/users/logout/')
        if (response.status === 200) {
            return { success: 'Successfully logged out' }
        } else {
            return { failure: 'Something went wrong' }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }

})

export const getUser = createAsyncThunk('/api/users/user/', async (access, thunkAPI) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${access}`
        }
    }

    try {
        const response = await axios.get('/api/users/user/', config)
        if (response.status === 200) {
            return response.data
        } else {
            return { failure: 'Something went wrong' }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
