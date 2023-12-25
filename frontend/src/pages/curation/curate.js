import { CurationSearchBar } from './components/searchBar'
import { CurationGallery } from './components/gallery'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserSettings } from '../../features/user/userActions'

export function Curate() {
    const { viewNSFW, viewPrivate } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleNSFWUserSettings = () => {
        const body = {
            viewNSFW,
        }
        dispatch(updateUserSettings(body))
    }

    const handlePrivateUserSettings = () => {
        const body = {
            viewPrivate
        }
        dispatch(updateUserSettings(body))
    }

    return (
        <div id="curation-wrapper">
            <CurationSearchBar data={{ viewNSFW, viewPrivate, handleNSFWUserSettings, handlePrivateUserSettings }} />
            <CurationGallery data={{ viewNSFW, viewPrivate }} />
        </div>
    )
}