import * as React from "react";

export function SourceContainer(data) {
    const { twitterLink, artistName, tweet_url } = data.data
    return (
        <div className="source-container">
            <a href={twitterLink}>
                <p className="username">{artistName}</p>
            </a>
            <a href={tweet_url}>
                <img
                    className="twitter-icon"
                    src={process.env.PUBLIC_URL + "/static/assets/twitter_icon.png"}
                    alt=""
                />
            </a>
        </div>
    )
}