import { useRef } from 'react'

import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const FileButtons = (props) => {
  const onChangeHandler = props.onChangeHandler
  const accept = props.accepted

  const hiddenFileInput = useRef(null)

  const handleClick = (e) => {
    e.preventDefault()
    hiddenFileInput.current.click()
  }

  return (
    <>
      <button className="button-upload" onClick={handleClick}>Select</button>
      <input
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        onChange={onChangeHandler}
        required
      />
    </>
  )
}

export const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#c70000',
    '&:hover': {
      backgroundColor: alpha('#c70000', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#c70000',
  },
}));
