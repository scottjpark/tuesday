import { useRef } from 'react'

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