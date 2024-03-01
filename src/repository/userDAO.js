const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const jwt = require("jsonwebtoken");

const secretKey = "secret";

const logger = require("../util/logger");

const client = new DynamoDBClient({ region: "us-east-1" });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "FoundationUserDatabase";
// this is the dao object

async function registerUser(Item){
  //let x = getAllItems();
  //return x;
  let data = "";
  const command = new ScanCommand({
    TableName,
    FilterExpression: "#username = :username",
    ExpressionAttributeNames: {"#username": "username"},
    ExpressionAttributeValues: {':username': Item.username}
  });

  try{
    data = await documentClient.send(command);
  }catch(error){
      logger.error(error);
  }
  if(data.Items.length == 0)
  {
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
  return "User already exists";
}

async function loginUser(Item){
  let data = "";
  const command = new ScanCommand({
    TableName,
    FilterExpression: "#username = :username",
    ExpressionAttributeNames: {"#username": "username"},
    ExpressionAttributeValues: {':username': Item.username}
  });

  try{
    data = await documentClient.send(command);
  }catch(error){
      logger.error(error);
  }
  if(data.Items.length != 0)
  {
    if (data.Items[0].password != Item.password) {
      return null;
    } else {
      // generate a JWT token
  
      const token = jwt.sign(
        {
          username: data.Items[0].username,
          password: data.Items[0].password,
          role: data.Items[0].role,
        },
        secretKey,
        {
          expiresIn: "15m", // token expiration time (adjust as needed)
        }
      );
      return token;
    }
  }
  return null;
}


module.exports = {
  loginUser,
  registerUser
};
