import { createSlice } from '@reduxjs/toolkit'
import { uploadAvatar, getAvatar } from './userActions'

const initialState = {
    avatarURL: 'https://dmcfse5dawjc0.cloudfront.net/media/default.webp',
    loading: false,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(uploadAvatar.pending, (state) => {
                state.loading = true
            })
            .addCase(uploadAvatar.fulfilled, (state, payload) => {
                state.loading = false
            })
            .addCase(uploadAvatar.rejected, (state, payload) => {
                state.loading = false
            })
            .addCase(getAvatar.fulfilled, (state, payload) => {
                if (payload.payload.profile_image) state.avatarURL = payload.payload.profile_image
            })
    }
})

export default userSlice.reducer
