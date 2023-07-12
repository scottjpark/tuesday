import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk('/api/users/register/', async (userData, thunkAPI) => {
    const config = {
        headers: {
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