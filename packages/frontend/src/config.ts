const config = {
    // Backend config
    table: {
      REGION: import.meta.env.VITE_REGION,
      TABLE: import.meta.env.VITE_TABLE,
    },
    apiGateway: {
      REGION: import.meta.env.VITE_REGION,
      ADMIN_URL: import.meta.env.VITE_API_ADMIN_URL,
      CUSTOMER_URL: import.meta.env.VITE_API_CUSTOMER_URL, 
      WEBSOCKET_URL: import.meta.env.VITE_API_WEBSOCKET_URL,  
      
    },
    cognito: {
      REGION: import.meta.env.VITE_REGION,

      ADMIN_USER_POOL_ID: import.meta.env.VITE_ADMIN_USER_POOL_ID,
      ADMIN_APP_CLIENT_ID: import.meta.env.VITE_ADMIN_USER_POOL_CLIENT_ID,
      ADMIN_IDENTITY_POOL_ID: import.meta.env.VITE_ADMIN_IDENTITY_POOL_ID,

      CUSTOMER_USER_POOL_ID: import.meta.env.VITE_CUSTOMER_USER_POOL_ID,
      CUSTOMER_APP_CLIENT_ID: import.meta.env.VITE_CUSTOMER_USER_POOL_CLIENT_ID,
      CUSTOMER_IDENTITY_POOL_ID: import.meta.env.VITE_CUSTOMER_IDENTITY_POOL_ID,  
    },
  };
  
  export default config;