import * as React from 'react';
import './ModalStyle.css';


type props = {
    header: string,
    description: string
}
const Modal: React.FC<props> = (props) => {
    
    const deleteModal = () => {
        const element = document.getElementById('custom-modal-container');
        element.parentElement.remove();
    }
    
    return (
        <div className='custom-modal-container' id='custom-modal-container' >
            <div className='modal-bg' onClick={deleteModal}></div>
            
            <div className='modal'>
                <div className='modal-header'>
                    <h1>{props.header}</h1>
                    <p>{props.description}</p>
                </div>
                <div className='modal-content'>
                    {props.children}
                </div>
            </div>
        </div>
    ) 
}

export default Modal