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
            const response = await axios.post('/api/users/user_settings/', body, config)
            if (response.status === 202) {

                const { dispatch } = thunkAPI
                dispatch(getUserSettings(access))

                return { success: 'Successfully Uploaded' }
            } else {
                return { failure: 'Something went wrong' }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getUserSettings = createAsyncThunk(
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
            const response = await axios.get('/api/users/user_settings/', config)
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

export const updateUserSettings = createAsyncThunk(
    'users/update',
    async (body, thunkAPI) => {
        // Do not update profile image here
        const { access } = cookie.parse(document.cookie, 'access')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            }
        }
        try {
            const response = await axios.patch('/api/users/user_settings/', body, config)
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