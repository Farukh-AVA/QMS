import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {

  // Create the DynamoDB table
  const table = new Table(stack, "Queue", {
    fields: {
      queueMemberId: "string",
    },
    primaryIndex: { partitionKey: "queueMemberId"},
  });

  return {
    table,
  };
}