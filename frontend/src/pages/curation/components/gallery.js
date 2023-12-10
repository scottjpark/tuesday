import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CuratedImageModal } from './galleryComponents/imageContainerComponents/imageModal'
import { loadImages, reloadImages } from '../../../features/curation/curationActions';
import { ImageContainer } from './galleryComponents/imageContainer';

import CircularProgress from '@mui/material/CircularProgress'
import Masonry from "react-responsive-masonry";

export function CurationGallery(data) {
    // Handles the display of image modal
    const [modalDisplay, setModalDisplay] = useState(false)
    const [modalImage, setModalImage] = useState(null)

    const { images, loading, moreleft } = useSelector(state => state.curation)
    const [displayImages, setDisplayImages] = useState([])
    const [loadedOffset, setLoadedOffset] = useState(0)

    const { viewNSFW, viewPrivate } = data.data

    // Initial Image Load
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadImages(loadedOffset))
    }, [dispatch, loadedOffset]);

    // Sets loaded images
    useEffect(() => {
        setDisplayImages(images)
    }, [images])

    const loadMoreImages = () => {
        const newOffset = loadedOffset + 1
        setLoadedOffset(newOffset)
    }

    useEffect(() => {
        dispatch(reloadImages())
    }, [dispatch, viewNSFW, viewPrivate])

    return (
        <>
            {
                modalDisplay && modalImage &&
                <CuratedImageModal data={{ modalImage, setModalDisplay, setModalImage }} />
            }

            <div className="curation-display">
                <Masonry columnsCount={4} gutter="15px">
                    {
                        displayImages.map(image => {
                            return <ImageContainer key={image.id} data={{ image, setModalDisplay, setModalImage }} />
                        })
                    }
                </Masonry>
                {
                    loading ?
                        <CircularProgress /> :
                        moreleft ?
                            <div id="curation-load-more-button" onClick={loadMoreImages}>Load More</div> :
                            <div id="curation-load-no-more" onClick={loadMoreImages}>No more images</div>
                }
            </div>
        </>
    )
}