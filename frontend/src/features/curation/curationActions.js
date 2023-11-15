import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import cookie from 'cookie'

export const loadImages = createAsyncThunk(
    'curation',
    async (offset, thunkAPI) => {
        const { access } = cookie.parse(document.cookie, 'access')
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${access}`
            }
        }
        try {
            const response = await axios.get(`/api/curation/curated_images/?offset=${offset}`, config)
            if (response.status === 200) {
                return { success: 'Successfully Uploaded', data: response.data }
            } else {
                return { failure: 'Something went wrong' }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)