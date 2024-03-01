const ticketDao = require("../repository/TicketDAO");
const uuid = require("uuid");

async function getEmployeeTickets(username) {
  const tickets = await ticketDao.getEmployeeTickets(username);
  return tickets;
}

async function getPendingTickets() {
  const tickets = await ticketDao.getPendingTickets();
  return tickets;
}

async function getApprovedTickets() {
  const tickets = await ticketDao.getApprovedTickets();
  return tickets;
}

async function getDeniedTickets() {
  const tickets = await ticketDao.getDeniedTickets();
  return tickets;
}

async function getAllTickets() {
  const tickets = await ticketDao.getAllTickets();
  return tickets;
}

async function postTicket(receivedData, username) {
  if(validateItemWithType(receivedData))
  {
    let data = await ticketDao.postTicket({
      ticket_id: uuid.v4(),
      employee: username,
      amount: receivedData.amount,
      description: receivedData.description,
      type: receivedData.type,
      status: "pending"
    });
    return data;
  }
  else if (validateItem(receivedData)) {
    let data = await ticketDao.postTicket({
      ticket_id: uuid.v4(),
      employee: username,
      amount: receivedData.amount,
      description: receivedData.description,
      type: "unknown",
      status: "pending"
    });
    return data;
  }
  else if(!receivedData.description)
  {
    return "Missing Description";
  }
  else if(!receivedData.amount)
  {
    return "Missing amount";
  }
}

async function updateTicket(receivedData) {
  if (receivedData.status && receivedData.ticket_id) {
    let data = await ticketDao.updateTicket({
      ticket_id: receivedData.ticket_id,
      status: receivedData.status
    });
    return data;
  }

  return null;
}


function validateItem(receivedData) {
  if (!receivedData.amount || !receivedData.description) {
    return false;
  }
  return true;
}

function validateItemWithType(receivedData) {
  if (!receivedData.amount || !receivedData.description || !receivedData.type) {
    return false;
  }
  return true;
}

module.exports = {
  getEmployeeTickets,
  getPendingTickets,
  getApprovedTickets,
  getDeniedTickets,
  getAllTickets,
  postTicket,
  updateTicket
};
