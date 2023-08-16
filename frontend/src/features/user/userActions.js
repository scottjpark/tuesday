import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import cookie from 'cookie'

export const uploadAvatar = createAsyncThunk(
    '/api/users/avatar/post',
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

                const { dispatch } = thunkAPI
                dispatch(getAvatar(access))

                return { success: 'Successfully Uploaded' }
            } else {
                return { failure: 'Something went wrong' }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getAvatar = createAsyncThunk(
    '/api/users/avatar/get',
    async (_, thunkAPI) => {
        const { access } = cookie.parse(document.cookie, 'access')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            }
        }
        try {
            const response = await axios.get('/api/users/avatar/', config)
            if (response.status === 200) {
                return response.data
            } else {
                return { failure: 'Something went wrong' }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)