import React, { useState } from 'react';
import './StatusTable.css';
import NotiModal from './Modal/NotiModal';

function StatusTable({ tickets }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null); // State to hold the selected ticket ID
  const [action, setAction] = useState('');

  const handleEdit = (ticketId) => { // Modified to accept ticketId
    setSelectedTicketId(ticketId); // Set the selected ticket ID
    setAction('edit');
    setShowEditModal(true);
  };

  const handleDelete = (ticketId) => { // Modified to accept ticketId
    setSelectedTicketId(ticketId); // Set the selected ticket ID
    setAction('delete');
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'rgba(255, 153, 0, 0.8)';
      case 'accepted':
        return 'rgba(102, 255, 153,0.8)';
      case 'resolved':
        return 'rgba(204, 153, 255,0.9)';
      case 'rejected':
        return 'rgba(204, 77, 77,0.9)';
      default:
        return 'black';
    }
  };

  // Function to format timestamp with space between date and time
  const formatTimeStamp = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  };

  return (
    <div className="status-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Contact Info</th>
            <th>Status</th>
            <th>Created Time</th>
            <th>Latest Time</th>
            <th colSpan="2">Options</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={`${ticket.id}_${index}`} style={{ backgroundColor: getStatusColor(ticket.status) }}>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.contactInfo}</td>
              <td style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{ticket.status}</td>
              <td>{formatTimeStamp(ticket.createdTimeStamp)}</td>
              <td>{formatTimeStamp(ticket.latestTimeStamp)}</td>
              <td><button onClick={() => handleEdit(ticket.id)}>Edit</button></td> {/* Pass ticket ID to handleEdit */}
              <td><button onClick={() => handleDelete(ticket.id)}>Delete</button></td> {/* Pass ticket ID to handleDelete */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render Edit and Delete Modals */}
      {showEditModal && (
        <NotiModal
          action={action}
          onClose={closeModal}
          selectedTicketId={selectedTicketId}
        />
      )}
      {showDeleteModal && (
        <NotiModal
          action={action}
          onClose={closeModal}
          selectedTicketId={selectedTicketId}
        />
      )}
    </div>
  );
}

export default StatusTable;
