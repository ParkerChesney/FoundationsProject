//obsolete code

/*
const { logger } = require("./util/logger");

const registeredUsers = [];

const tickets = [];

function registerUser(username, password) {
  const newUser = {
    username,
    password,
    manager: false,
  };
  let exists = false;
  for(let i = 0; i < registeredUsers.length; i++)
  {
    if(registeredUsers[i].username == username)
    {
      exists = true;
      break;
    }
  }
  if(exists)
  {
    logger.info(`Username is already taken`);
    return `Username is already taken`;
  }
  registeredUsers.push(newUser);
  logger.info(`Added User: ${newUser.username}`);
  return `"${username} has been added`;
}

function login(username, password) {
  for(let i = 0; i < registeredUsers.length; i++)
  {
    if(registeredUsers[i].username == username)
    {
      if(registeredUsers[i].password == password)
      {
        logger.info(`Login Successful`);
        return `Login Successful`;
      }
      else
      {
        logger.info(`Incorrect Password`);
        return `Incorrect Password`;
      }
    }
  }
  logger.info(`Username not found`);
  return `Username not found`;
}

function newTicket(id, author, description, type, amount)
{
  const newTicket = {
    id,
    author,
    description,
    type,
    amount,
    status: "pending"
  };
  if(description != null && description != "")
  {
    if(amount != null)
    {
      if(Number(amount) === amount && amount % 1 === 0)
      {
        tickets.push(newTicket);
        logger.info(`Added ticket: ${id}`);
        return `ticket ${id} has been added`;
      }
      else
      {
        logger.info(`amount is not a number`);
        return `amount is not a number`;
      }
    }
    else
    {
      logger.info(`Ticket requires amount`);
      return `Ticket requires amount`;
    }
  }
  else
  {
    logger.info(`Ticket requires description`);
    return `Ticket requires description`;
  }
}

function retrievePending()
{
  const pending = [];
  for(let i = 0; i < tickets.length; i++)
  {
    if(tickets[i].status == "pending")
    {
      pending.push(tickets[i]);
    }
  }
  return pending;
}

function previousTickets(author)
{
  const prevTickets = [];
  for(let i = 0; i < tickets.length; i++)
  {
    if(author == tickets[i].author)
    {
      prevTickets.push(tickets[i]);
    }
  }
  return prevTickets;
}

module.exports = {
  registeredUsers,
  tickets,
  registerUser,
  login,
  newTicket,
  retrievePending,
  previousTickets
};

*/