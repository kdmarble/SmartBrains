import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onButtonSubmit, handleKeyPress }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} onKeyPress={handleKeyPress} />
                    <button id='detectButton' className='f4 w-30 grow link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} onKeyPress={handleKeyPress}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm