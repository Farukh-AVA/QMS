import { DynamoDB, ApiGatewayManagementApi, AWSError } from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandler } from "aws-lambda";

const TableName = Table.Connections.tableName;
const dynamoDb = new DynamoDB.DocumentClient();
interface ConnectionItem {
  id: string;
}

export const main: APIGatewayProxyHandler = async (event) => {

  //const { stage, domainName } = event.requestContext;
  console.log("SendMessage has been called!")
  const connections = await dynamoDb
    .scan({ TableName, ProjectionExpression: "id" })
    .promise();

  const apiG = new ApiGatewayManagementApi({
    //endpoint: `${domainName}/${stage}`,
    //endpoint: '4wf02dowz9.execute-api.us-east-1.amazonaws.com/dev' 
    endpoint: 'q11l3xrpu7.execute-api.us-east-1.amazonaws.com/prod'
  });

  const postToConnection = async function ({ id }: ConnectionItem) {
    try {
      // Send the message to the given client
      const data = event.body ? event.body : '';
      await apiG
        .postToConnection({ ConnectionId: id, Data: event.data })
        .promise();
    } catch (e) {
      const error = e as AWSError;
      if (error.statusCode === 410) {
        // Remove stale connections
        await dynamoDb.delete({ TableName, Key: { id } }).promise();
      }
    }
  };

  // Iterate through all the connections
  
  await Promise.all(connections.Items.map(postToConnection));

  return { statusCode: 200, body: "Message sent" };
};