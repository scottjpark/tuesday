import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import cookie from 'cookie'
import { getAvatar } from '../user/userActions'

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
            document.cookie = cookie.serialize('access', response.data.access)
            document.cookie = cookie.serialize('refresh', response.data.refresh)

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

            const { dispatch } = thunkAPI
            dispatch(getAvatar(access))

            return response.data
        } else {
            return { failure: 'Something went wrong' }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const verify = createAsyncThunk('/api/users/token/verify/', async (_, thunkAPI) => {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const { access } = cookie.parse(document.cookie, 'access')
    const body = { "token": access }

    try {
        const response = await axios.post('/api/users/token/verify/', body, config)
        if (response.status === 200) {
            const { dispatch } = thunkAPI
            dispatch(getUser(access))
            return { success: 'Token verified' }
        } else {
            return { failure: 'Something went wrong' }
        }
    } catch (error) {
        try {
            if (error.response.status === 401) {
                const { refresh } = cookie.parse(document.cookie, 'refresh')
                const body = { "refresh": refresh }
                const response = await axios.post('/api/users/token/refresh/', body, config)
                if (response.status === 200 && response.data) {
                    document.cookie = cookie.serialize('access', response.data.access)
                    document.cookie = cookie.serialize('refresh', response.data.refresh)
                    const { dispatch } = thunkAPI
                    dispatch(getUser(access))
                }
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})