import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateImage, deleteImage } from '../../../../../features/curation/curationActions'

import { SourceContainer } from './imageModalComponents/sourceContainer'
import { TagContainer } from './imageModalComponents/tagContainer'
import { PrivacyContainer } from './imageModalComponents/privacyContainer'

import CircularProgress from '@mui/material/CircularProgress'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export function CuratedImageModal(data) {
  const handleClose = () => {
    data.data.setModalDisplay(false)
    data.data.setModalImage(null)
  };

  const { modalImage } = data.data
  const { imageDetailLoading } = useSelector(state => state.curation)
  const auth = useSelector(state => state.auth)

  const {
    id,
    artist_names,
    display_name,
    image,
    tweet_url,
    user
  } = modalImage;

  const artistName = (artist_names.length === 0 || display_name.length === 0) ? '' : display_name[0].display_name + '@' + artist_names[0].artist_name
  const twitterLink = (artist_names.length === 0 || display_name.length === 0) ? 'https://twitter.com' : `https://twitter.com/${artist_names[0].artist_name}`
  const savedBy = (user.username) ? user.username : null
  const imageOwner = (user.id === auth.user.id)

  const [tags, setTags] = useState(modalImage.tags)
  const [nsfw, setNSFW] = useState(modalImage.nsfw)
  const [privateImage, setPrivateImage] = useState(modalImage.privacy_status)

  const emptyStagedChanges = { id, tagAdd: [], tagRemove: [], nsfw, privateImage, changed: false }
  const [stagedChanges, setStagedChanges] = useState(emptyStagedChanges)
  const dispatch = useDispatch()

  const handleStagedChanges = () => {
    dispatch(updateImage(stagedChanges))
    setStagedChanges(() => emptyStagedChanges)
  }

  const discardStagedChanges = () => {
    setTags(() => modalImage.tags)
    setNSFW(() => modalImage.nsfw)
    setPrivateImage(() => modalImage.privacy_status)
    setStagedChanges(() => emptyStagedChanges)
  }

  const deleteImageForever = () => {
    dispatch(deleteImage(id)).then(() => {
      handleClose()
    })
  }

  return (
    <>
      <div className="curated-modal-image-container">
        <img className="curated-modal-image" src={image} alt="" />
        <div className="curated-modal-details-container">
          <div>
            <SourceContainer data={{ twitterLink, artistName, tweet_url }} />
            <TagContainer data={{ tags, setTags, stagedChanges, setStagedChanges }} />
            {
              imageOwner &&
              <PrivacyContainer data={{ nsfw, setNSFW, privateImage, setPrivateImage, stagedChanges, setStagedChanges }} />
            }
            <div className="other-details-wrapper">
              {
                imageDetailLoading ?
                  <CircularProgress /> :
                  <div>
                    <button disabled={!stagedChanges.changed} onClick={handleStagedChanges}>Save</button>
                    <button disabled={!stagedChanges.changed} onClick={discardStagedChanges}>Cancel</button>
                  </div>
              }
            </div>
          </div>
          {
            savedBy &&
            <div className="curated-modal-details-credits">
              <p>Image saved by {savedBy}</p>
              {imageOwner ? <DeleteForeverIcon onClick={deleteImageForever} /> : <div />}
            </div>
          }
        </div>
      </div>
      <div className="curated-modal-background" onClick={handleClose} />
    </>
  );
}
