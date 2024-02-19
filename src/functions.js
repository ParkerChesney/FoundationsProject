const { logger } = require("./util/logger");

const registeredUsers = [];

const tickets = [];

function registerUser(username, password) {
  const newUser = {
    username,
    password,
  };
  let exists = false;
  for(let i = 0; i < registeredUsers.length; i++)
  {
    if(registeredUsers[i].username == username)
    {
      exists = true;
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
  
}

module.exports = {
  registeredUsers,
  registerUser,
};
