import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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

    return (

        <div className="curation-display">
            {loading ?
                <CircularProgress /> :
                images.map(image => {
                    return (<ImageContainer key={image.id} data={image} />)
                })
            }
        </div>
    )
}