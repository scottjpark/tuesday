import { createSlice } from '@reduxjs/toolkit'
import { register, login, getUser, logout } from './authActions'

const initialState = {
    user: null,
    loggedIn: false,
    loading: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state) => {
                state.loggedIn = true
                state.loading = false
            })
            .addCase(register.rejected, (state) => {
                state.loading = false
            })
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false
                state.loggedIn = true
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, payload) => {
                state.loading = false
                state.user = payload.payload
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
            })
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state, payload) => {
                state.user = null
                state.loggedIn = false
                state.loading = false
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false
            })
    }
})

export default authSlice.reducer
