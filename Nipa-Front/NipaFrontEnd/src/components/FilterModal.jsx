import React from 'react';

const FilterModal = ({ open, onClose, handleFilter, handleResetFilter, handleSortByChange, handleFilterByChange }) => {
  return (
    <div className={`modal ${open ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Filter and Sort</h3>
        <div>
          <label>Sort by:</label>
          <select onChange={handleSortByChange}>
            <option value="">None</option>
            <option value="status">Status</option>
            <option value="latest">Latest Update</option>
          </select>
        </div>
        <div>
          <label>Filter by status:</label>
          <select onChange={handleFilterByChange}>
            <option value="">None</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={handleResetFilter}>Reset Filter</button>
      </div>
    </div>
  );
};

export default FilterModal;
