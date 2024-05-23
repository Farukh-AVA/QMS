//npx apig-test \  --username admin@example.com --password Passw0rd! --user-pool-id us-east-1_EmmVeu0bM --app-client-id 5ud265i2leljbnpgr0tlgjv9f --cognito-region us-east-1 --identity-pool-id us-east-1:046633ce-e3e8-4143-b894-5edf10285006 --invoke-url https://o1ys3kgnu1.execute-api.us-east-1.amazonaws.com/ --api-gateway-region us-east-1 --path-template /queue/26dec0f0-17a5-11ef-a4b5-95b4992c1a3c --method PUT --body '{\"name\":\"Farukh Updated\", \"phoneNumber\":\"777-777-7777\"}'

import { Table } from "sst/node/table";
import handler from "@websocket/core/handler";
import dynamoDb from "@websocket/core/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body || "{}");
  console.log("I am here")
  console.log("Member ID: "+event?.pathParameters?.id)
  const params = {
    TableName: Table.Queue.tableName,
    Key: {
      // The attributes of the item to be created
      //userId: "123", // The id of the author
      queueMemberId: event?.pathParameters?.id, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET fullName = :fullName, phoneNumber = :phoneNumber",
    ExpressionAttributeValues: {
      ":fullName": data.fullName || null,
      ":phoneNumber": data.phoneNumber || null, 
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return JSON.stringify({ status: true });
});