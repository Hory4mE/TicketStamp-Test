import React, { useState } from 'react';
import axios from 'axios';
import './NotiModal.css';

function NotiModal({ action, onClose, selectedTicketId }) {
    const [newStatus, setNewStatus] = useState('');

    const handleEditSubmit = (status) => {
        setNewStatus(status);
    };

    const handleConfirm = async () => {
        try {
            if (action === 'edit') {
                // Send the updated status to the backend
                await axios.put(`http://localhost:5000/api/tickets/${selectedTicketId}`, { status: newStatus });
            } else if (action === 'delete') {
                // Don't need to delete from any means
                // await axios.delete(`http://localhost:5000/api/tickets/${selectedTicketId}`);
            }

            onClose(); // Close Modal

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="noti-modal">
            <div className="noti-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Notification</h2>
                {action === 'edit' && (
                    <div>
                        <p>Are you sure to <span className="action">{action}</span> this data?</p>
                        <p>Select new status:</p>
                        <select onChange={(e) => handleEditSubmit(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                )}
                {action === 'delete' && (
                    <p>You cannot delete created ticket !</p>
                )}
                <div className="button-container">
                    <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default NotiModal;
