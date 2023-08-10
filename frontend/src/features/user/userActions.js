import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import cookie from 'cookie'

export const uploadAvatar = createAsyncThunk(
    '/api/users/avatar/',
    async (profileImage, thunkAPI) => {
        const { access } = cookie.parse(document.cookie, 'access')
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${access}`
            }
        }
        const body = { profile_image: profileImage }
        try {
            const response = await axios.post('/api/users/avatar/', body, config)
            if (response.status === 202) {
                return response.data
            } else {
                return { failure: 'Something went wrong' }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    })
