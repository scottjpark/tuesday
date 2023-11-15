export function ImageContainer(imageData) {
    const { artistNames, displayNames, image, nsfw, privateImage, tags, tweetURL, user } = imageData.data

    const artistName = displayNames[0].display_name + '@' + artistNames[0].artist_name
    const twitterLink = `https://twitter.com/${artistNames[0].artist_name}`

    return (
        <div className="curation-image-container">
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
                            return <div className="tag-name">{tag.tag_name}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}