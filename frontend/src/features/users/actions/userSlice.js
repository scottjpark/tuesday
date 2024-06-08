import { createSlice } from '@reduxjs/toolkit'
import { uploadAvatar, getUserSettings, updateUserSettings } from './userActions'

const initialState = {
    avatarURL: 'https://dmcfse5dawjc0.cloudfront.net/media/default.webp',
    loading: false,
    viewNSFW: false,
    viewPrivate: false
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
            .addCase(uploadAvatar.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(uploadAvatar.rejected, (state) => {
                state.loading = false
            })
            .addCase(getUserSettings.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserSettings.fulfilled, (state, payload) => {
                if (payload.payload.profile_image) state.avatarURL = payload.payload.profile_image
                state.viewNSFW = payload.payload.view_nsfw
                state.viewPrivate = payload.payload.view_private
            })
            .addCase(getUserSettings.rejected, (state) => {
                state.loading = true
            })
            .addCase(updateUserSettings.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserSettings.fulfilled, (state, payload) => {
                if (payload.payload.profile_image) state.avatarURL = payload.payload.profile_image
                state.viewNSFW = payload.payload.view_nsfw
                state.viewPrivate = payload.payload.view_private
            })
            .addCase(updateUserSettings.rejected, (state) => {
                state.loading = true
            })
    }
})

export default userSlice.reducer
