import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const uploadAvatar = createAsyncThunk(
    '/api/users/avatar/',
    async (profileImage, thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        const body = { file: profileImage }
        try {
            const response = await axios.post('/api/users/avatar/', body, config)
            if (response.status === 200) {
                return { success: 'Profile picture set' }
            } else {
                return { failure: 'Something went wrong' }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    })
