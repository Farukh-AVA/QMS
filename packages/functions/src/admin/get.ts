import { Table } from "sst/node/table";
import handler from "@websocket/core/handler";
import dynamoDb from "@websocket/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Queue.tableName,
    // 'Key' defines the partition key and sort key of
    // the item to be retrieved
    Key: {
      queueMemberId: event?.pathParameters?.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return JSON.stringify(result.Item);
});