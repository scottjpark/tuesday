import { RedSwitch } from '../../../../../utils/utils'
import LockOpenIcon from "@mui/icons-material/LockOpen"
import LockIcon from "@mui/icons-material/Lock"
import WorkIcon from "@mui/icons-material/Work"
import WorkOffIcon from "@mui/icons-material/WorkOff"

export function PrivacyContainer(data) {
    const { nsfw, setNSFW, privateImage, setPrivateImage, stagedChanges, setStagedChanges } = data.data

    const nsfwIcon = nsfw ? <WorkOffIcon /> : <WorkIcon />
    const privacyIcon = privateImage ? <LockIcon /> : <LockOpenIcon />

    const handleNSFWChange = () => {
        const newStagedChanges = stagedChanges
        newStagedChanges["nsfw"] = !nsfw
        newStagedChanges["changed"] = true

        setNSFW(() => !nsfw)
        setStagedChanges(newStagedChanges)
    }

    const handlePrivacyChange = () => {
        const newStagedChanges = stagedChanges
        newStagedChanges["privateImage"] = !privateImage
        newStagedChanges["changed"] = true

        setPrivateImage(() => !privateImage)
        setStagedChanges(newStagedChanges)
    }

    return (
        <div className="status-container">
            <div className="nsfw-container">
                <p>NSFW</p>
                <RedSwitch
                    checked={nsfw}
                    onChange={handleNSFWChange}
                />
                {nsfwIcon}
            </div>
            <div className="privacy-container">
                <p>Private to me</p>
                <RedSwitch
                    checked={privateImage}
                    onChange={handlePrivacyChange}
                />
                {privacyIcon}
            </div>
        </div>
    );
}
