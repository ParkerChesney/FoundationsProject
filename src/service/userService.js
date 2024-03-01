const userDAO = require("../repository/userDAO");
const uuid = require("uuid");

/*
async function getAllItems() {
  const items = await itemDao.getAllItems();
  return items;
}

async function getItemByName(name){
    const item = await itemDao.getItemByName(name);
    return item;
}
*/

async function registerUser(receivedData) {
  if (validateItem(receivedData)) {
    if(receivedData.role == "Finance Manager")
    {
      let data = await userDAO.registerUser({
        user_id : uuid.v4(),
        username: receivedData.username,
        password: receivedData.password,
        role: "Finance Manager"
      });
    }
    else
    {
      let data = await userDAO.registerUser({
        user_id : uuid.v4(),
        username: receivedData.username,
        password: receivedData.password,
        role: "Employee"
      });
    }
    return data;
  }
  return "Missing username or password";
}

async function loginUser(receivedData) {
    if (validateItem(receivedData)) {
      let data = await userDAO.loginUser({
        username: receivedData.username,
        password: receivedData.password,
      });
      return data;
    }
    return "Missing username or password";
  }
  

function validateItem(receivedData) {
  if (!receivedData.username || !receivedData.password) {
    return false;
  }
  return true;
}

module.exports = {
    loginUser,
    registerUser
};
