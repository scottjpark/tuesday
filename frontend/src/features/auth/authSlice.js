import { createSlice } from '@reduxjs/toolkit'
import { register } from './authActions'

const initialState = {
    username: null,
    loggedIn: false,
    loading: false,
    registered: false,
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
                state.registered = true
                state.loading = false
            })
            .addCase(register.rejected, (state) => {
                state.loading = false
            })
    }
})

export default authSlice.reducer
