/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import FilterModal from "./components/Modal/FilterModal";
import { fetchTickets, fetchFilterTickets } from "./ApiRequest/api.jsx";
import StatusTable from "./components/TicketBoard/StatusTable.jsx";
import TicketForm from "./components/CreateTicket/TicketForm";

function App() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
 
  const fetchTicketsData = async () => { // FOR CALLBACK
    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching tickets:", error);
      }
    };
    fetchData();
  }, [sortBy, filterBy]);

  const handleCreateTicket = async () => {
    try {
      const updatedTicketsData = await fetchTickets();
      setTickets(updatedTicketsData); // Update tickets state with new data
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleSortByChange = async (e) => {
    setSortBy(e.target.value);
    const updatedTicketsData = await fetchTickets();
    setTickets(updatedTicketsData); // Update tickets state with new data
  };

  const handleFilterByChange = async (e) => {
    setFilterBy(e.target.value);
    const updatedTicketsData = await fetchTickets();
    setTickets(updatedTicketsData); // Update tickets state with new data
  };

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleFilter = async () => {
    try {
      const response = await fetchFilterTickets(filterBy, sortBy);
      console.log("Filtered tickets:", response.data); // Log the filtered tickets
      setFilteredTickets(response.data);
      setFilterModalOpen(false);
    } catch (error) {
      console.error("Error filtering tickets:", error);
    }
  };

  const handleResetFilter = async () => {
    try {
      // Send request to reset filter on the backend
      setFilteredTickets([]); // Reset filtered tickets state
      setSortBy(""); // Reset sort by state
      setFilterBy(""); // Reset filter by state
      setLoading(false);
      console.log("Filter reset successfully");
    } catch (error) {
      console.error("Error resetting filter:", error);
    }
  };

  return (
    <div className="Big Container">
      <TicketForm onTicketCreated={handleCreateTicket} />
      <button className="filter-button" onClick={handleFilterClick}>
        Filter <i className="fas fa-filter"></i>
      </button>
      <button className="ResetFilter-button" onClick={handleResetFilter}>
        Reset Filter
      </button>
      <FilterModal
        open={filterModalOpen}
        onClose={handleFilterModalClose}
        handleFilter={handleFilter}
        handleResetFilter={handleResetFilter}
        handleSortByChange={handleSortByChange}
        handleFilterByChange={handleFilterByChange}
      />
      <StatusTable
        tickets={filteredTickets.length > 0 ? filteredTickets : tickets}
        filteredTickets={filteredTickets} 
        setFilteredTickets={setFilteredTickets} 
        fetchTicketsData={fetchTicketsData}
      />
    </div>
  );
}

export default App;
