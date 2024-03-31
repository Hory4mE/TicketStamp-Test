/* eslint-disable react/prop-types */
import { useState } from "react";
import "./NotiModal.css";
import { editTicket } from "../../ApiRequest/api";

function NotiModal({
  action,
  onClose,
  selectedTicketId,
  fetchTicketsData,
  tickets,
  filteredTickets,
  setFilteredTickets,
}) {
  const [newStatus, setNewStatus] = useState("");
  const isConfirmDisabled = newStatus === "please select"; // Define condition for disabling Confirm button

  const handleEditSubmit = (status) => {
    setNewStatus(status);
  };

  const handleConfirm = async () => {
    try {
      if (action === "edit") {
        await editTicket(newStatus, selectedTicketId);

        // Update the ticket status in the tickets data
        const updatedTickets = tickets.map((ticket) => {
          if (ticket.id === selectedTicketId) {
            return { ...ticket, status: newStatus };
          }
          return ticket;
        });

        // Update the ticket status in the filteredTickets data
        const updatedFilteredTickets = filteredTickets.map((ticket) => {
          if (ticket.id === selectedTicketId) {
            return { ...ticket, status: newStatus };
          }
          return ticket;
        });

        setFilteredTickets(updatedFilteredTickets); // Update filteredTickets state
        fetchTicketsData(); // Call fetchTicketsData function to update tickets data
      }
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="noti-modal">
      <div className="noti-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Notification</h2>
        {action === "edit" && (
          <div>
            <p>
              Are you sure to <span className="action">{action}</span> this
              data?
            </p>
            <p>Select new status:</p>
            <select onChange={(e) => handleEditSubmit(e.target.value)}>
              <option value="please select">Please Select</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
        {action === "delete" && <p>You cannot delete created ticket!</p>}
        <div className="button-container">
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={isConfirmDisabled} // Disable Confirm button based on condition
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotiModal;
