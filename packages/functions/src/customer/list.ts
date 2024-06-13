import { Table } from "sst/node/table";
import handler from "@websocket/core/handler";
import dynamoDb from "@websocket/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Queue.tableName,
  };

  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return JSON.stringify(result.Items);
});