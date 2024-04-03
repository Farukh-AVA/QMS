import { StackContext, Table, WebSocketApi } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the table
  const tableWebsocket = new Table(stack, "Connections", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });
  // Create the WebSocket API
  const apiWebsocket = new WebSocketApi(stack, "Api", {
    defaults: {
      function: {
        bind: [tableWebsocket],
      },
    },
    routes: {
      $connect: "packages/functions/src/websocket/connect.main",
      $disconnect: "packages/functions/src/websocket/disconnect.main",
      sendmessage: "packages/functions/src/websocket/sendMessage.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: apiWebsocket.url,
  });

  return{
    apiWebsocket, 
  } 

}