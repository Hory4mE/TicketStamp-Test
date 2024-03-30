import React, { useState } from 'react';
import axios from 'axios';

const CreateTicket = ({ fetchTickets }) => {
  const [ticket, setTicket] = useState({ title: '', description: '', contact: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket(prevTicket => ({ ...prevTicket, [name]: value }));
  };

  const createTicket = async () => {
    try {
      const newTicketData = {
        title: ticket.title,
        description: ticket.description,
        contactInfo: ticket.contact,
        status: 'pending'
      };
      const response = await axios.post('http://localhost:5000/api/tickets', newTicketData);
      if (response.status === 201) {
        fetchTickets();
      }
      setTicket({ title: '', description: '', contact: '' });
      console.log('Ticket created successfully:', response.data);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="ticket-container">
      <div className="ticket">
        <div className="ticket-header">
          <h2>Create Ticket</h2>
        </div>
        <div className="ticket-body">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={ticket.title} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" rows="4" value={ticket.description} onChange={handleInputChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Information:</label>
            <input type="text" id="contact" name="contact" value={ticket.contact} onChange={handleInputChange} />
          </div>
        </div>
        <div className="ticket-footer">
          <button className="btn" onClick={createTicket}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
