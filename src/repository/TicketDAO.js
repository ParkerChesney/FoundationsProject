const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const logger = require("../util/logger");

const client = new DynamoDBClient({ region: "us-east-1" });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "FoundationTicketDatabase";
// this is the dao object

async function postTicket(Item){
  const command = new PutCommand({
    TableName,
    Item
  });
  try{
      const data = await documentClient.send(command);
      return data
  }catch(error){
      logger.error(error);
  }
}

async function getEmployeeTickets(username){
  const command = new ScanCommand({
      TableName,
      FilterExpression: "#employee = :employee",
      ExpressionAttributeNames: {"#employee": "employee"},
      ExpressionAttributeValues: {':employee': username}
  });

  try{
      const data = await documentClient.send(command);
      if(data.Items.length == 0)
      {
        return null;
      }
      return data.Items;
  }catch(error){
      logger.error(error);
  }
}

async function getPendingTickets() {
  const command = new ScanCommand({
      TableName,
      FilterExpression: "#status = :status",
      ExpressionAttributeNames: {"#status": "status"},
      ExpressionAttributeValues: {':status': "pending"}
  });

  try{
      const data = await documentClient.send(command);
      if(data.Items.length == 0)
      {
        return null;
      }
      return data.Items;
  }catch(error){
      logger.error(error);
  }
}

async function getApprovedTickets() {
  const command = new ScanCommand({
      TableName,
      FilterExpression: "#status = :status",
      ExpressionAttributeNames: {"#status": "status"},
      ExpressionAttributeValues: {':status': "approved"}
  });

  try{
      const data = await documentClient.send(command);
      if(data.Items.length == 0)
      {
        return null;
      }
      return data.Items;
  }catch(error){
      logger.error(error);
  }
}

async function getDeniedTickets() {
  const command = new ScanCommand({
      TableName,
      FilterExpression: "#status = :status",
      ExpressionAttributeNames: {"#status": "status"},
      ExpressionAttributeValues: {':status': "denied"}
  });

  try{
      const data = await documentClient.send(command);
      if(data.Items.length == 0)
      {
        return null;
      }
      return data.Items;
  }catch(error){
      logger.error(error);
  }
}

async function getAllTickets() {
  const command = new ScanCommand({
    TableName,
  });

  try {
    const data = await documentClient.send(command);
    return data.Items;
  } catch (error) {
    logger.error(error);
  }
}

async function updateTicket(Item) {

  const command = new ScanCommand({
      TableName,
      FilterExpression: "#ticket_id = :ticket_id",
      ExpressionAttributeNames: {"#ticket_id": "ticket_id"},
      ExpressionAttributeValues: {':ticket_id': Item.ticket_id}
  });
  let data = "";
  try{
      data = await documentClient.send(command);
  }catch(error){
      logger.error(error);
  }

  if(data.Items.length == 0)
  {
    return "ticket does not exist";
  }
  else
  {
    if(data.Items[0].status == "pending")
    {
      if(Item.status == "denied")
      {
        const command2 = new UpdateCommand
        ({
            TableName,
            Key: {
              ticket_id: Item.ticket_id
            },
            UpdateExpression: 'SET #status = :status',
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ':status': "denied"
            }
        });
        try {
          const data2 = await documentClient.send(command2);
          return data2;
        } catch (error) {
          logger.error(error);
        }
      }
      else if(Item.status == "approved")
      {
        const command2 = new UpdateCommand
        ({
            TableName,
            Key: {
              ticket_id: Item.ticket_id
            },
            UpdateExpression: 'SET #status = :status',
            ExpressionAttributeNames: {
              "#status": "status"
            },
            ExpressionAttributeValues: {
              ':status': "approved"
            }
        });
        try {
          const data2 = await documentClient.send(command2);
          return data2;
        } catch (error) {
          logger.error(error);
        }
      }
      else
      {
        return "status command unknown";
      }
    }
    else
    {
      return "ticket status must be pending";
    }
  }
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
