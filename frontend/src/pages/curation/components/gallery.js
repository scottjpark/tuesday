import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CuratedImageModal } from './galleryComponents/imageContainerComponents/imageModal'

import CircularProgress from '@mui/material/CircularProgress'

import { loadImages } from '../../../features/curation/curationActions';
import { ImageContainer } from './galleryComponents/imageContainer';

export function CurationGallery() {
    const { images, loading } = useSelector(state => state.curation)
    const [displayImages, setDisplayImages] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadImages(0))
    }, [dispatch]);

    useEffect(() => {
        setDisplayImages(images)
    }, [images])

    // Handles the display of image modal
    const [modalDisplay, setModalDisplay] = useState(false)
    const [modalImage, setModalImage] = useState(null)

    return (
        <>
            {
                modalDisplay && modalImage &&
                <CuratedImageModal data={{ modalImage, setModalDisplay, setModalImage }} />
            }
            {
                loading ?
                    <CircularProgress /> :
                    <div className="curation-display">
                        {
                            displayImages.map(image => {
                                return <ImageContainer key={image.id} data={{ image, setModalDisplay, setModalImage }} />
                            })
                        }
                    </div>
            }
        </>
    )
}