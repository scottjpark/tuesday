import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CuratedImageModal } from './imageModal'

import CircularProgress from '@mui/material/CircularProgress'

import { loadImages } from '../../../features/curation/curationActions';
import { ImageContainer } from './imageContainer';

export function CurationGallery() {
    const dispatch = useDispatch()
    const getCuratedImages = () => {
        dispatch(loadImages(0))
    }

    useEffect(() => {
        getCuratedImages();
    }, []);

    const { images, loading } = useSelector(state => state.curation)

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
                        {images.map(image => {
                            return (<ImageContainer key={image.id} data={{ image, setModalDisplay, setModalImage }} />)
                        })}
                    </div>
            }
        </>
    )
}