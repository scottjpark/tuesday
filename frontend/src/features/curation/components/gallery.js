import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CuratedImageModal } from './galleryComponents/imageContainerComponents/imageModal'
import { loadImages, reloadImages } from '../actions/curationActions';
import { ImageContainer } from './galleryComponents/imageContainer';

import CircularProgress from '@mui/material/CircularProgress'
import Masonry from "react-responsive-masonry";

export function CurationGallery(data) {
    // Handles the display of image modal
    const [modalDisplay, setModalDisplay] = useState(false)
    const [modalImage, setModalImage] = useState(null)

    const { images, loadedImageIds, loading, moreleft, searchKeys, randomOrder } = useSelector(state => state.curation)
    const [displayImages, setDisplayImages] = useState([])

    const { viewNSFW, viewPrivate } = data.data

    // Initial Image Load
    const dispatch = useDispatch()

    useEffect(() => {
        if (images.length === 0) {
            const params = {
                loadCount: 50,
                searchKeys: '',
                loadedImageIds: '',
                randomOrder,
            }
            dispatch(loadImages(params))
        }
        return
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Sets loaded images
    useEffect(() => {
        setDisplayImages(images)
    }, [images])

    const loadMoreImages = () => {
        const params = {
            loadCount: 50,
            searchKeys: searchKeys.join(','),
            loadedImageIds: loadedImageIds.join('|'),
            randomOrder,
        }
        dispatch(loadImages(params))
    }

    const firstImageLoad = useRef(true)
    useEffect(() => {
        if (firstImageLoad.current) {
            firstImageLoad.current = false
            return
        }
        const params = {
            loadCount: 50,
            searchKeys: searchKeys.join(','),
            loadedImageIds: '',
            randomOrder,
        }
        dispatch(reloadImages(params))
    }, [viewNSFW, viewPrivate, searchKeys, randomOrder]) // eslint-disable-line react-hooks/exhaustive-deps

    // Scroll through images with left/right arrow keys
    const handleImageChange = (e, modalImage) => {
        if (e.code === 'Escape') {
            handleModalClose()
        }

        if (['ArrowLeft', 'ArrowRight'].includes(e.code) && modalImage && images) {
            e.preventDefault()

            const imageIdx = images.indexOf(modalImage)
            const prevIdx = imageIdx !== 0 ? imageIdx - 1 : imageIdx
            const nextIdx = imageIdx !== images.length - 1 ? imageIdx + 1 : imageIdx
            const newIdx = e.code === 'ArrowLeft' ? prevIdx : nextIdx
            if (images[newIdx]) setModalImage(images[newIdx])
        }
    }

    const handleModalClose = () => {
        setModalDisplay(false)
        setModalImage(null)
    };

    return (
        <>
            {
                modalDisplay && modalImage &&
                <>
                    <CuratedImageModal data={{ modalImage, setModalDisplay, setModalImage, handleModalClose, handleImageChange }} />
                    <div className="curated-modal-background" onClick={handleModalClose} />
                </>
            }

            <div className="curation-display">
                <Masonry columnsCount={5} gutter="15px">
                    {
                        displayImages.map(image => {
                            return <ImageContainer key={image.id} data={{ image, setModalDisplay, setModalImage }} />
                        })
                    }
                </Masonry>
                {
                    loading ?
                        <><div className="whitespace10" /><CircularProgress /></> :
                        moreleft ?
                            <div id="curation-load-more-button" onClick={loadMoreImages}>Load More</div> :
                            <div id="curation-load-no-more">No more images</div>
                }
            </div>
        </>
    )
}