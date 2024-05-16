import config from "./config.ts";

const customerConfig = {
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.CUSTOMER_USER_POOL_ID,
      identityPoolId: config.cognito.CUSTOMER_IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.CUSTOMER_APP_CLIENT_ID,
    },
    Storage: {
      region: config.table.REGION,
      bucket: config.table.TABLE,
      identityPoolId: config.cognito.CUSTOMER_IDENTITY_POOL_ID,
    },
    API: {
      endpoints: [
        {
          name: "customer",
          endpoint: config.apiGateway.CUSTOMER_URL,
          region: config.apiGateway.REGION,
        },
        {
          name: "websocket",
          endpoint: config.apiGateway.WEBSOCKET_URL,
          region: config.apiGateway.REGION,
        }
      ],
    },
  };
  

export default  customerConfig 