
/*
  call Admin message API:
  npx apig-test \  --username admin@example.com --password Passw0rd! --user-pool-id us-east-1_EmmVeu0bM --app-client-id 5ud265i2leljbnpgr0tlgjv9f --cognito-region us-east-1 --identity-pool-id us-east-1:046633ce-e3e8-4143-b894-5edf10285006 --invoke-url https://o1ys3kgnu1.execute-api.us-east-1.amazonaws.com --api-gateway-region us-east-1 --path-template /message --method POST --body '{\"name\":\"Farukh\", \"phoneNumber\":\"+13475832393\"}'
  
*/

import handlere from "@websocket/core/src/handler"
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: process.env.AWS_REGION });

export const main = handlere(async (event) => {
    
    var message = "";
    var phoneNumber = ""; 
    
    if (event.body != null) {
        const data = JSON.parse(event.body);
        message = "Hey "+data.fullName+" you are next in the queue.";
        phoneNumber  = data.phoneNumber 
    }
    const params = {
        Message: message,
        PhoneNumber: phoneNumber
    }
    
    
    const result = await snsClient.send(new PublishCommand(params));

    
    return JSON.stringify(result)
});