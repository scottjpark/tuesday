import { createSlice } from '@reduxjs/toolkit'
import { uploadAvatar } from './userActions'

const initialState = {
    avatarURL: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(uploadAvatar.pending, (state) => {
                console.log(state)
            })
            .addCase(uploadAvatar.fulfilled, (state) => {
                console.log(state)
            })
            .addCase(uploadAvatar.rejected, (state) => {
                console.log(state)
            })
    }
})

export default userSlice.reducer
