import axios from 'axios';

export const fetchTickets = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tickets');
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const createNewTicket = async (newTicketData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/tickets', newTicketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};
