import React from 'react';
import StatusTable from './StatusTable';

const TicketTable = ({ tickets, filteredTickets, handleEdit }) => {
  return (
    <StatusTable
      tickets={filteredTickets.length > 0 ? filteredTickets : tickets}
      onEdit={handleEdit}
    />
  );
};

export default TicketTable;
