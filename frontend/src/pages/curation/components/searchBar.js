import { RedSwitch } from '../../utils/utils'
import SearchIcon from '@mui/icons-material/Search';

export function CurationSearchBar(data) {
    const { viewNSFW, viewPrivate, handleNSFWUserSettings, handlePrivateUserSettings } = data.data

    return (
        <div className="curation-search">
            <div id="curation-searchbar-wrapper">
                <input id="curation-searchbar" type="text" placeholder="DOESN'T WORK LOL..." />
                <div id="curation-searchicon"><SearchIcon /></div>
            </div>
            <div id="curation-search-options-wrapper">
                <p>NSFW: </p><RedSwitch size="small" checked={viewNSFW} onClick={handleNSFWUserSettings} />
                <p>Private: </p><RedSwitch size="small" checked={viewPrivate} onClick={handlePrivateUserSettings} />
            </div>
        </div>
    )
}