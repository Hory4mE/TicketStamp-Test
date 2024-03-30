import React, { useState, useEffect } from 'react';
import './App.css';
import CreateTicket from './components/CreateTicket';
import TicketTable from './components/TicketTable';
import FilterModal from './components/FilterModal';
import { fetchTickets, createNewTicket } from './ApiRequest/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [ticket, setTicket] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id, field, value) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === id) {
        ticket[field] = value;
        ticket.latestTimeStamp = new Date().toLocaleString();
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterByChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleFilter = async () => {
    try {
      let url = 'http://localhost:5000/api/tickets';

      // Checking algorithm `Sort` or `Filter` on url
      if (filterBy) {
        url += `/filter/${filterBy}`;
      } else if (sortBy) {
        url += `/sort/${sortBy}`;
      }

      // Fetch data after Action

      const response = await axios.get(url);
      setFilteredTickets(response.data);
      setFilterModalOpen(false);
    } catch (error) {
      console.error('Error filtering tickets:', error);
    }
  };

  const handleResetFilter = async () => {
    try {
      // Send request to reset filter on the backend
      const response = await axios.get('http://localhost:5000/api/tickets');
      setFilteredTickets([]); // Reset filtered tickets state
      setSortBy(''); // Reset sort by state
      setFilterBy(''); // Reset filter by state
      setLoading(false);
      console.log('Filter reset successfully');
    } catch (error) {
      console.error('Error resetting filter:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket(prevTicket => ({
      ...prevTicket,
      [name]: value
    }));
  };

  const createTicket = async () => {
    try {

      const newTicketData = {
        title: ticket.title,
        description: ticket.description,
        contactInfo: ticket.contact, // Renamed to match the desired output
        status: 'pending' // Assuming new tickets are initially in pending status
      };

      // Send POST request to create a new ticket
      const response = await axios.post('http://localhost:5000/api/tickets', newTicketData);

      if (response.status === 201) {
        fetchTickets();
      }

      // Clear the form fields
      setTicket({
        title: '',
        description: '',
        contact: ''
      });

      console.log('Ticket created successfully:', response.data);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className='Big Container'>
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

      {/* Displaying tickets */}
      <button className="filter-button" onClick={handleFilterClick}>
        Filter <i className="fas fa-filter"></i>
      </button>
      <button className="ResetFilter-button" onClick={handleResetFilter}>Reset Filter</button>
      <TicketTable
        tickets={tickets}
        filteredTickets={filteredTickets}
        handleEdit={handleEdit}
      />
      <FilterModal
        open={filterModalOpen}
        onClose={handleFilterModalClose}
        handleFilter={handleFilter}
        handleResetFilter={handleResetFilter}
        handleSortByChange={handleSortByChange}
        handleFilterByChange={handleFilterByChange}
      />
    </div>
  );
}

export default App;
