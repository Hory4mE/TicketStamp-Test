import React from 'react';
import './Modal.css';

function Modal({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className='modal-row'>
                    <div className="modal-content">
                        {children}
                    </div>
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>

            </div>
        </div>

    );
}

export default Modal;
