
/*
  call Admin message API:
  npx apig-test \  --username admin@example.com --password Passw0rd! --user-pool-id us-east-1_EmmVeu0bM --app-client-id 5ud265i2leljbnpgr0tlgjv9f --cognito-region us-east-1 --identity-pool-id us-east-1:046633ce-e3e8-4143-b894-5edf10285006 --invoke-url https://o1ys3kgnu1.execute-api.us-east-1.amazonaws.com --api-gateway-region us-east-1 --path-template /message --method POST --body '{\"name\":\"Farukh\", \"phoneNumber\":\"+13475832393\"}'
  
*/

import handlere from "@websocket/core/src/handler"

var AWS = require("aws-sdk");

export const main = handlere(async (event) => {
    var message = "";
    var phoneNumber = ""; 
    const originationNumber = process.env.ORIGINATION_NUMBER;
    const destinationNumber = process.env.DESTINATION_NUMBER || "";
    const applicationId = process.env.APPLICATION_ID;
    const messageType = process.env.MESSAGE_TYPE;


    //Create a new Pinpoint object.
    var pinpoint = new AWS.Pinpoint();

    if (event.body != null) {
        const data = JSON.parse(event.body);
        message = "Hey "+data.fullName+" you are next in the queue.";
        phoneNumber  = data.phoneNumber 
    }

    
    // Specify the parameters to pass to the API.
    var params = {
        ApplicationId: applicationId,
        MessageRequest: {
            Addresses: {
                [destinationNumber]: {
                ChannelType: "SMS",
                },
            },
            MessageConfiguration: {
                SMSMessage: {
                    Body: message,
                    MessageType: messageType,
                    OriginationNumber: originationNumber
                },
            },
        },
    };
    
    //Try to send the message.
    const result = await pinpoint.sendMessages(params).promise();
    const { MessageResponse } = result;
    const resultObject = MessageResponse.Result; 
    console.log("Message send result:", JSON.stringify(resultObject, null, 2));
    return JSON.stringify({ MessageResponse, Result: resultObject  }); 
    
});