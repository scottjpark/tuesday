import axios from 'axios'
import cookie from 'cookie'
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
            console.log(response.data)
            return response.data
        } else {
            return thunkAPI.rejectWithValue(response.data)
        }
    } catch (error) {
        console.log(error.response.data)
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
            return { success: 'Successfully logged in' }
        } else {
            return { failure: 'Something went wrong' }
        }
    } catch (error) {
        console.log(error.response.data)
        return thunkAPI.rejectWithValue(error.response.data)
    }
})