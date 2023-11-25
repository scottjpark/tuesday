import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import WorkIcon from '@mui/icons-material/Work';
import WorkOffIcon from '@mui/icons-material/WorkOff';

export function ImageContainer(data) {
    const { artist_names, display_name, image, nsfw, privacy_status, tags, tweet_url } = data.data.image

    const artistName = (artist_names.length === 0 || display_name.length === 0) ? '' : display_name[0].display_name + '@' + artist_names[0].artist_name
    const twitterLink = (artist_names.length === 0 || display_name.length === 0) ? 'https://twitter.com' : `https://twitter.com/${artist_names[0].artist_name}`

    const pivacyState = privacy_status ? <LockIcon /> : <LockOpenIcon />
    const nsfwState = nsfw ? <WorkOffIcon /> : <WorkIcon />

    const openModal = () => {
        data.data.setModalDisplay(true)
        data.data.setModalImage(data.data.image)
    }

    return (
        <div className="curation-image-container" onClick={openModal}>
            <img src={image} alt='' />
            <div className="image-details">
                <div className="image-details-upper">
                    <div className="source-container">
                        <a href={twitterLink}><p className="username">{artistName}</p></a>
                        <a href={tweet_url}><img className="twitter-icon" src={process.env.PUBLIC_URL + '/static/assets/twitter_icon.png'} alt='' /></a>
                    </div>
                </div>
                <div className="image-details-lower">
                    <div className="tag-container">
                        {tags.map((tag) => {
                            return <div className="tag-name" key={tag.id}>{tag.tag_name}</div>
                        })}
                    </div>
                    <div className="status-container">
                        {nsfwState}
                        {pivacyState}
                    </div>
                </div>
            </div>
        </div>
    )
}