import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@websocket/core/handler";
import dynamoDb from "@websocket/core/dynamodb";
import AWS from "aws-sdk";

const lambda = new AWS.Lambda();

export const main = handler(async (event) => {
  let data = {
    name: "",
    phoneNumber: ""
  };
  const type = "CUSTOMER"

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Queue.tableName,
    Item: {
        // The attributes of the item to be created
        queueMemberId: uuid.v1(), // A unique uuid
        //content: data.content, // Parsed from request body
        name: data.name,
        phoneNumber: data.phoneNumber, 
        type: type,
        createdAt: Date.now(), // Current Unix timestamp
    },
  };
  const messageToWebSocet = {
   // 'action': 'sendmessage',
    'data': type
  };
/** 
  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
*/  
try {
  // Save the queue member to DynamoDB
  await dynamoDb.put(params);
  
  // Invoke the sendMessage Lambda function
  await lambda.invoke({
    FunctionName: "dev-qms-ExampleStack-Apisendmessage758172CC-LrasHCDHW50D", // Replace with the name of your sendMessage Lambda function
    InvocationType: "RequestResponse", // Synchronous invocation
    Payload: JSON.stringify(messageToWebSocet)  // Pass the queue member data as payload
  }).promise();
  
  return JSON.stringify(params.Item);
} catch (error) {
  console.error("Error:", error);
  throw error;
}
});

