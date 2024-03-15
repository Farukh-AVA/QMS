import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@websocket/core/handler";
import dynamoDb from "@websocket/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    name: "",
    phoneNumber: ""
  };
  const type = "ADMIN"

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

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});

