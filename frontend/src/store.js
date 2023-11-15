import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import curationSlice from './features/curation/curationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        curation: curationSlice
    }
})
