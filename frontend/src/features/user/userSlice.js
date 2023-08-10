import { createSlice } from '@reduxjs/toolkit'
import { uploadAvatar } from './userActions'

const initialState = {
    avatarURL: null,
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
                state.avatarURL = payload.payload.profile_image
            })
            .addCase(uploadAvatar.rejected, (state, payload) => {
                state.loading = false
                console.log(payload)
            })
    }
})

export default userSlice.reducer
