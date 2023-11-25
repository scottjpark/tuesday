import { createSlice } from '@reduxjs/toolkit'
import { loadImages } from './curationActions'
import { updateImage } from './curationActions'

const initialState = {
    offset: 0,
    loading: false,
    images: [],
    imageDetailLoading: false,
    updatedImage: null
}

export const curationSlice = createSlice({
    name: 'curation',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadImages.pending, (state) => {
                state.loading = true
            })
            .addCase(loadImages.fulfilled, (state, payload) => {
                state.loading = false
                state.images = payload.payload.data
                console.log(state.images)
            })
            .addCase(loadImages.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateImage.pending, (state) => {
                state.imageDetailLoading = true
            })
            .addCase(updateImage.fulfilled, (state, payload) => {
                const updatedImage = payload.payload.data
                const newImages = state.images.map((image) => {
                    return image.id === updatedImage.id ? updatedImage : image
                })
                state.images = newImages
                state.imageDetailLoading = false
            })
            .addCase(updateImage.rejected, (state) => {
                state.imageDetailLoading = false
            })
    }
})

export default curationSlice.reducer