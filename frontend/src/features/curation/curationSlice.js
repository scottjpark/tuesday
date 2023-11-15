import { createSlice } from '@reduxjs/toolkit'
import { loadImages } from './curationActions'

const initialState = {
    offset: 0,
    loading: false,
    images: []
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
                // Convert django snakecase to camelcase
                const convertedPayload = []
                payload.payload.data.forEach(imageData => {
                    Object.defineProperty(imageData, 'artistNames', Object.getOwnPropertyDescriptor(imageData, 'artist_names'))
                    delete imageData['artist_names']
                    Object.defineProperty(imageData, 'displayNames', Object.getOwnPropertyDescriptor(imageData, 'display_name'))
                    delete imageData['display_name']
                    Object.defineProperty(imageData, 'tweetURL', Object.getOwnPropertyDescriptor(imageData, 'tweet_url'))
                    delete imageData['tweet_url']
                    Object.defineProperty(imageData, 'privateImage', Object.getOwnPropertyDescriptor(imageData, 'private'))
                    delete imageData['private']
                    convertedPayload.push(imageData)
                })
                state.images = convertedPayload
            })
            .addCase(loadImages.rejected, (state) => {
                state.loading = false
            })
    }
})

export default curationSlice.reducer