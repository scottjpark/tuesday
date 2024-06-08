import { createSlice } from '@reduxjs/toolkit'
import { loadImages, reloadImages, updateImage, deleteImage, setSearchFilter, setRandomOrder } from './curationActions'

const initialState = {
    images: [],
    loadedImageIds: [],
    moreleft: true,
    updatedImage: null,
    loading: false,
    reloading: false,
    imageDetailLoading: false,
    searchKeys: [],
    randomOrder: true,
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
                state.images = [...state.images, ...payload.payload.data.images]
                state.loadedImageIds = [
                    ...state.loadedImageIds,
                    ...payload.payload.data.images.map(image => image.id)
                ]
                state.moreleft = payload.payload.data.more
            })
            .addCase(loadImages.rejected, (state) => {
                state.loading = false
            })
            .addCase(reloadImages.pending, (state) => {
                state.reloading = true
            })
            .addCase(reloadImages.fulfilled, (state, payload) => {
                state.reloading = false
                state.loadedImageIds = payload.payload.data.images.map(image => image.id)
                state.images = payload.payload.data.images
                state.moreleft = payload.payload.data.more
            })
            .addCase(reloadImages.rejected, (state) => {
                state.reloading = false
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
            .addCase(deleteImage.fulfilled, (state, payload) => {
                state.loading = false
                const imageID = payload.payload.data.deleted_image_id[0]
                const newImages = state.images.filter((image) => {
                    return image.id !== imageID
                })
                state.images = newImages
                state.loadedImageIds = [
                    state.loadedImageIds.filter(image => image.id !== imageID)
                ]
                state.imageDetailLoading = false
            })
            .addCase(deleteImage.pending, (state) => {
                state.imageDetailLoading = true
            })
            .addCase(deleteImage.rejected, (state) => {
                state.imageDetailLoading = false
            })
            .addCase(setSearchFilter.fulfilled, (state, payload) => {
                state.loading = false
                state.searchKeys = payload.payload.success
            })
            .addCase(setSearchFilter.pending, (state) => {
                state.loading = true
            })
            .addCase(setSearchFilter.rejected, (state) => {
                state.loading = false
            })
            .addCase(setRandomOrder.fulfilled, (state, payload) => {
                state.loading = false
                state.randomOrder = payload.payload.orderSettings
            })
            .addCase(setRandomOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(setRandomOrder.rejected, (state) => {
                state.loading = false
            })
    }
})

export default curationSlice.reducer