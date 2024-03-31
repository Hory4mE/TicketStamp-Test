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
    return response;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const fetchFilterTickets = async (filterBy, sortBy) => {
  try {
    let url = 'http://localhost:5000/api/tickets';

    if (filterBy) {
      // console.log("got filter")
      url += `/filter/${filterBy}`;
    } else if (sortBy) {
      // console.log("got sort")
      url += `/sort/${sortBy}`;
      // console.log(url)
    }

    const response = await axios.get(url);

    // console.log("fetch filter ticket success")
    return response;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const editTicket = async (newStatus, selectedTicketId) => {
  try {
    await axios.put(
      `http://localhost:5000/api/tickets/${selectedTicketId}`,
      { status: newStatus }
    );
  }catch(error){
    console.log("Error : ",error);
  }
}
