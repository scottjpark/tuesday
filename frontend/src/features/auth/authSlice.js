import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: '',
    username: '',
    logged_in: false
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user_id = action.payload.user_id
            state.username = action.payload.username
            state.logged_in = true
        },
        logout: (state) => {
            state.user_id = ''
            state.username = ''
            state.logged_in = false
        },
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer