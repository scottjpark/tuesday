import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/users/actions/authSlice'
import userReducer from './features/users/actions/userSlice'
import curationSlice from './features/curation/actions/curationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        curation: curationSlice
    }
})
