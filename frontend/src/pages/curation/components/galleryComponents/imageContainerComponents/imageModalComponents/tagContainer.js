import { useState } from "react";
import { useSelector } from 'react-redux'
import CancelIcon from "@mui/icons-material/Cancel";

export function TagContainer(data) {
  const { tags, stagedChanges, setStagedChanges, setTags } = data.data
  const [tagTextInput, setTagTextInput] = useState('')

  const { user } = useSelector(state => state.auth)
  const myTags = []
  const otherTags = []
  tags.forEach(tag => {
    if (tag.tagged_by && tag.tagged_by.id) {
      tag.tagged_by.id === user.id ? myTags.push(tag) : otherTags.push(tag)
    } else {
      myTags.push(tag)
    }
  })

  const handleTagRemoval = (tag) => {
    const newDisplayedTags = tags.filter(
      (displayTag) => displayTag.tag_name !== tag.tag_name
    );
    setTags(newDisplayedTags);

    const newStagedTags = stagedChanges
    newStagedTags.tagRemove.push(tag)
    newStagedTags.changed = true
    setStagedChanges(newStagedTags)
  };

  const handleTagInputChange = (e) => {
    e.preventDefault();
    setTagTextInput(e.target.value);
  };

  const handleTagInput = (e) => {
    if (["Tab", "Enter", "Comma"].includes(e.code)) {
      e.preventDefault();

      const newTagID = myTags.length;
      const newDisplayedTags = [
        ...myTags,
        { id: newTagID, tag_name: tagTextInput },
      ];
      setTags(newDisplayedTags);

      handleTagAddition(tagTextInput);
      setTagTextInput("");
    }
  };

  const handleTagAddition = (newTag) => {
    const newStagedTags = stagedChanges
    newStagedTags.tagAdd.push(newTag)
    newStagedTags.changed = true
    setStagedChanges(newStagedTags)
  };

  return (
    <div className="curation-modal-tag-wrapper">
      <div className="tag-container">
        <p>Tags:</p>
        <div>
          {myTags.map((tag) => {
            return (
              <div className="tag-name-self" key={tag.id}>
                {tag.tag_name}
                <CancelIcon
                  onClick={() => {
                    handleTagRemoval(tag);
                  }}
                />
              </div>
            );
          })}
          {otherTags.map((tag) => {
            return (
              <div className="tag-name-others" key={tag.id}>
                {tag.tag_name}
              </div>
            );
          })}
        </div>
      </div>
      <input
        type="text"
        className="curation-modal-tag-text"
        onChange={handleTagInputChange}
        onKeyDown={handleTagInput}
        value={tagTextInput}
      />
    </div>
  );
}
