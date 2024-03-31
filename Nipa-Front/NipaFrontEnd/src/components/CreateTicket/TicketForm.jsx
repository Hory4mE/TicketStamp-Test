/* eslint-disable react/prop-types */
import { useState } from "react";
import { createNewTicket } from "../../ApiRequest/api";
import "./TicketForm.css";

function TicketForm({ onTicketCreated }) {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    contact: "",
  });

  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState(""); // State to hold error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleCreateTicket = async () => {
    try {
      // Check if any of the required fields are empty
      if (!ticket.title || !ticket.description || !ticket.contact) {
        setError("All fields are required.");
        return; // Exit the function early if any required field is empty
      }

      const newTicketData = {
        title: ticket.title,
        description: ticket.description,
        contactInfo: ticket.contact,
        status: "pending",
      };

      const response = await createNewTicket(newTicketData);

      if (response.status === 201) {
        // Notify parent component that ticket has been created
        onTicketCreated();
      }

      // Clear the form fields and reset error message
      setTicket({
        title: "",
        description: "",
        contact: "",
      });
      setError("");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="ticket-container">
      <button
        className="ticket-btn"
        onClick={() => setFormVisible(!formVisible)}
      >
        Create Ticket
      </button>
      <div
        className={`ticket-form ${formVisible ? "visible" : ""}`}
      >
        <div className="ticket-header">
          <h2>Create Ticket</h2>
        </div>
        <div className="ticket-body">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={ticket.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={ticket.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Information:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={ticket.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>} {/* Display error message */}
        </div>
        <div className="ticket-footer">
          <button className="btn" onClick={handleCreateTicket}>
            Confirm
          </button>
          <button className="btn" onClick={() => setFormVisible(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketForm;
