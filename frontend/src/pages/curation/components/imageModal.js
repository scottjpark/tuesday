import * as React from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import WorkIcon from '@mui/icons-material/Work';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import CancelIcon from '@mui/icons-material/Cancel';

export function CuratedImageModal(data) {
    // const { artistNames, displayNames, image, nsfw, privateImage, tags, tweetURL, user, id } = data.imageData.data
    const handleClose = () => {
        data.data.setModalDisplay(false)
        data.data.setModalImage(null)
    }

    const { artistNames, displayNames, image, nsfw, privateImage, tags, tweetURL } = data.data.modalImage
    const artistName = displayNames[0].display_name + '@' + artistNames[0].artist_name
    const twitterLink = `https://twitter.com/${artistNames[0].artist_name}`

    const pivacyState = privateImage ? <LockIcon /> : <LockOpenIcon />
    const nsfwState = nsfw ? <WorkOffIcon /> : <WorkIcon />

    return (
        <>
            <div className="curated-modal-image-container">
                <img className="curated-modal-image" src={image} alt='' />
                <div className="curated-modal-details-container">
                    <div className="image-details">
                        <div className="source-container">
                            <a href={twitterLink}><p className="username">{artistName}</p></a>
                            <a href={tweetURL}><img className="twitter-icon" src={process.env.PUBLIC_URL + '/static/assets/twitter_icon.png'} alt='' /></a>
                        </div>
                        <div className="tag-container">
                            <p>Tags:</p>
                            {tags.map((tag) => {
                                return <div className="tag-name" key={tag.id}>{tag.tag_name}<CancelIcon /></div>
                            })}
                        </div>
                        <div className="status-container">
                            {nsfwState}
                            {pivacyState}
                        </div>
                    </div>
                </div>
            </div>
            <div className="curated-modal-background" onClick={handleClose} />
        </>
    )
}