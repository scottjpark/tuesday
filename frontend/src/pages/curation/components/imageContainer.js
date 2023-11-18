import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import WorkIcon from '@mui/icons-material/Work';
import WorkOffIcon from '@mui/icons-material/WorkOff';

export function ImageContainer(data) {
    const { artistNames, displayNames, image, nsfw, privateImage, tags, tweetURL } = data.data.image

    const artistName = displayNames[0].display_name + '@' + artistNames[0].artist_name
    const twitterLink = `https://twitter.com/${artistNames[0].artist_name}`

    const pivacyState = privateImage ? <LockIcon /> : <LockOpenIcon />
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
                        <a href={tweetURL}><img className="twitter-icon" src={process.env.PUBLIC_URL + '/static/assets/twitter_icon.png'} alt='' /></a>
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