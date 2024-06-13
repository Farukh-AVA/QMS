/*
  Call customer create API:
  npx apig-test \  --username customer@example.com --password Passw0rd! --user-pool-id us-east-1_2vSNqOrpv  --app-client-id 2eqbaqvqk76s3bhtcsj3fk72g  --cognito-region us-east-1 --identity-pool-id us-east-1:741eaa41-ab4d-4ca3-bd58-c52fa4e86e0a --invoke-url https://aykgq0fr54.execute-api.us-east-1.amazonaws.com --api-gateway-region us-east-1 --path-template /queue --method POST --body '{\"name\":\"Farukh\", \"phoneNumber\":\"777-777-7777\"}'
 
*/

import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@websocket/core/handler";
import dynamoDb from "@websocket/core/dynamodb";
import AWS from "aws-sdk";

const lambda = new AWS.Lambda();

export const main = handler(async (event) => {
  let data = {
    fullName: "",
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
        fullName: data.fullName,
        phoneNumber: data.phoneNumber, 
        type: type,
        createdAt: Date.now(), // Current Unix timestamp
    },
  };
  const messageToWebSocet = {
    'data': type
  };
 
  try {
    // Save the queue member to DynamoDB
    await dynamoDb.put(params);
    
    // Invoke the sendMessage Lambda function
    await lambda.invoke({
      //FunctionName: "dev-qms-ExampleStack-Apisendmessage758172CC-LrasHCDHW50D", // Replace with the name of your sendMessage Lambda function
      FunctionName: "prod-qms-ExampleStack-Apisendmessage758172CC-Zav4UkNq10XO", 
      InvocationType: "RequestResponse", // Synchronous invocation
      Payload: JSON.stringify(messageToWebSocet)  // Pass the queue member data as payload
    }).promise();
    
    return JSON.stringify(params.Item);
  } catch (error) {
      console.error("Error:", error);
      throw error;
  }
});

