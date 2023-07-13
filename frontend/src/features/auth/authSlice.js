import { createSlice } from '@reduxjs/toolkit'
import { register, login } from './authActions'

const initialState = {
    username: null,
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
            .addCase(login, (state, payload) => {
                console.log(state, payload)
            })
    }
})

export default authSlice.reducer
