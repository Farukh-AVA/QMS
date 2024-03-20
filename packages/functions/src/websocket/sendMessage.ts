/**
 * Yes, the scenario you described can work for updating the admin frontend based on client registrations in the queue. Here's how it would work step by step:

Client Registration:

The client registers to the queue via a frontend interface (e.g., a form on a website or a touchscreen interface on an iPad).
The client registration data is sent to your backend server via a POST HTTP API.
Your backend server processes the registration request, updates the DynamoDB database with the client's information, and sends a success response to the client.
WebSocket Notification to Admin:

After successfully updating the database with the client's registration, your backend server sends a message over WebSocket to the admin frontend, notifying it of the update.
The WebSocket message can contain information about the update, such as the client's name and contact details, or simply a generic "updates" notification.
Admin Frontend Update:

Upon receiving the WebSocket message, the admin frontend updates its UI accordingly to reflect the new client registration.
The admin frontend may use an HTTP GET request to retrieve the updated queue information from DynamoDB and refresh its view.
Displaying Updated Queue Information:

The admin frontend displays the updated queue information, which now includes the newly registered client.
The admin can now see the client's details and manage the queue accordingly, such as calling the client for service or performing other administrative tasks.
This scenario effectively leverages a combination of HTTP APIs and WebSocket communication to facilitate real-time updates between the client and admin interfaces. The client initiates the registration process via an HTTP API, while the admin receives immediate notifications of updates through WebSocket messages, enabling quick and synchronized updates to the admin frontend.
 */







import { DynamoDB, ApiGatewayManagementApi } from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandler } from "aws-lambda";

const TableName = Table.Connections.tableName;
const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event) => {

  const connections = await dynamoDb
    .scan({ TableName, ProjectionExpression: "id" })
    .promise();

  const apiG = new ApiGatewayManagementApi({
    //endpoint: `${domainName}/${stage}`,
    endpoint: '4wf02dowz9.execute-api.us-east-1.amazonaws.com/dev' 
  });

  const postToConnection = async function ({ id }) {
    try {
      // Send the message to the given client
      await apiG
        .postToConnection({ ConnectionId: id, Data: event.data })
        .promise();
    } catch (e) {
      if (e.statusCode === 410) {
        // Remove stale connections
        await dynamoDb.delete({ TableName, Key: { id } }).promise();
      }
    }
  };

  // Iterate through all the connections
  await Promise.all(connections.Items.map(postToConnection));

  return { statusCode: 200, body: "Message sent" };
};