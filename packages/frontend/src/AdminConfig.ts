import config from "./config.ts";

const adminConfig = {
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.ADMIN_USER_POOL_ID,
      identityPoolId: config.cognito.ADMIN_IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.ADMIN_APP_CLIENT_ID,
    },
    Storage: {
      region: config.table.REGION,
      bucket: config.table.TABLE,
      identityPoolId: config.cognito.ADMIN_IDENTITY_POOL_ID,
    },
    API: {
      endpoints: [
        {
          name: "admin",
          endpoint: config.apiGateway.ADMIN_URL,
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

  export default  adminConfig;  