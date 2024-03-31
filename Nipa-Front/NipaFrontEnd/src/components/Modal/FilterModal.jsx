/* eslint-disable react/prop-types */
import './FilterModal.css'


const FilterModal = ({ open, onClose, handleFilter, handleSortByChange, handleFilterByChange }) => {
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
          <select onChange={handleFilterByChange} required>
            <option value="">None</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default FilterModal;
