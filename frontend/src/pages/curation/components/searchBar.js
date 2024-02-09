import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RedSwitch } from '../../utils/utils'
import SearchIcon from '@mui/icons-material/Search';
import { setRandomOrder, setSearchFilter } from '../../../features/curation/curationActions'

export function CurationSearchBar(data) {
    const { viewNSFW, viewPrivate, handleNSFWUserSettings, handlePrivateUserSettings } = data.data
    const { randomOrder } = useSelector(state => state.curation)
    const [searchKey, setSearchKey] = useState('')

    const dispatch = useDispatch()

    const handleSearchKeySeparator = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault()
            dispatch(setSearchFilter(searchKey))
        }
    }

    const handleSearchKeyEntry = (e) => {
        e.preventDefault()
        setSearchKey(e.target.value)
    }

    const handleRandomSettings = () => {
        dispatch(setRandomOrder(!randomOrder))
    }

    return (
        <div className="curation-search">
            <div id="curation-searchbar-wrapper">
                <input
                    id="curation-searchbar"
                    type="text"
                    onKeyDown={handleSearchKeySeparator}
                    onChange={handleSearchKeyEntry}
                    value={searchKey}
                    placeholder="Enter search keys separated by commas, then press Enter" />
                <div id="curation-searchicon"><SearchIcon /></div>
            </div>
            <div id="curation-search-options-wrapper">
                <p>Random: </p><RedSwitch size="small" checked={randomOrder} onClick={handleRandomSettings} />
                <p>NSFW: </p><RedSwitch size="small" checked={viewNSFW} onClick={handleNSFWUserSettings} />
                <p>Private: </p><RedSwitch size="small" checked={viewPrivate} onClick={handlePrivateUserSettings} />
            </div>
        </div>
    )
}