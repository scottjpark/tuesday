import { createSlice } from '@reduxjs/toolkit'
import { register, login, getUser, logout, verify } from './authActions'

const initialState = {
    user: null,
    loggedIn: false,
    loading: false,
    isAuthenticated: false,
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
                state.loading = true
            })
            .addCase(register.rejected, (state) => {
                state.loading = false
            })
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = true
            })
            .addCase(login.rejected, (state) => {
                state.loading = false
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, payload) => {
                state.loggedIn = true
                state.loading = false
                state.user = payload.payload
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
            })
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.loggedIn = false
                state.loading = false
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false
            })
            .addCase(verify.pending, (state) => {
                state.loading = true
            })
            .addCase(verify.fulfilled, (state) => {
                state.loading = true
                state.isAuthenticated = true
            })
            .addCase(verify.rejected, (state) => {
                state.loading = false
                state.isAuthenticated = false
            })
    }
})

export default authSlice.reducer
