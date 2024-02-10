import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateImage, deleteImage } from '../../../../../features/curation/curationActions'

import { SourceContainer } from './imageModalComponents/sourceContainer'
import { TagContainer } from './imageModalComponents/tagContainer'
import { PrivacyContainer } from './imageModalComponents/privacyContainer'

import CircularProgress from '@mui/material/CircularProgress'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export function CuratedImageModal(data) {
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
  } = data.data.modalImage;

  const artistName = (artist_names.length === 0 || display_name.length === 0) ? '' : display_name[0].display_name + '@' + artist_names[0].artist_name
  const twitterLink = (artist_names.length === 0 || display_name.length === 0) ? 'https://twitter.com' : `https://twitter.com/${artist_names[0].artist_name}`
  const savedBy = (user.username) ? user.username : null
  const imageOwner = (user.id === auth.user.id)

  const [tags, setTags] = useState(modalImage.tags)
  const [nsfw, setNSFW] = useState(modalImage.nsfw)
  const [privateImage, setPrivateImage] = useState(modalImage.privacy_status)

  useEffect(() => {
    setTags(() => data.data.modalImage.tags)
    setNSFW(() => data.data.modalImage.nsfw)
    setPrivateImage(() => data.data.modalImage.privacy_status)
  }, [data.data.modalImage])

  useEffect(() => {
    const imageChangeHandler = (e) => { data.data.handleImageChange(e, modalImage) }
    window.addEventListener('keydown', imageChangeHandler)
    return () => { window.removeEventListener('keydown', imageChangeHandler) }
  }, [modalImage]) // eslint-disable-line react-hooks/exhaustive-deps

  const emptyStagedChanges = { tagAdd: [], tagRemove: [], nsfw, privateImage, changed: false }
  const [stagedChanges, setStagedChanges] = useState(emptyStagedChanges)
  const dispatch = useDispatch()

  const handleStagedChanges = () => {
    stagedChanges.id = id
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
      data.data.handleModalClose()
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
    </>
  );
}
