import { Table } from "sst/node/table";
import handler from "@websocket/core/handler";
import dynamoDb from "@websocket/core/dynamodb";
import AWS from "aws-sdk";
const lambda = new AWS.Lambda();

export const main = handler(async (event) => {
  const type = "ADMIN"
  const params = {
    TableName: Table.Queue.tableName,
    Key: {
      //userId: "123", // The id of the author
      queueMemberId: event?.pathParameters?.id, // The id of the note from the path
    },
  };
  
  const messageToWebSocet = {
    'data': type
  };

  //await dynamoDb.delete(params);

  //return JSON.stringify({ status: true });
  try {
    // Save the queue member to DynamoDB
    await dynamoDb.delete(params);
    
    // Invoke the sendMessage Lambda function
    await lambda.invoke({
      FunctionName: "dev-qms-ExampleStack-Apisendmessage758172CC-LrasHCDHW50D", // Replace with the name of your sendMessage Lambda function
      InvocationType: "RequestResponse", // Synchronous invocation
      Payload: JSON.stringify(messageToWebSocet)  // Pass the queue member data as payload
    }).promise();
    
    return JSON.stringify({ status: true });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});