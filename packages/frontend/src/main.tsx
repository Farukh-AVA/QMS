import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import config from "./config.ts";
import customerConfig  from "./CustomerConfig";
import adminConfig from "./AdminConfig";
import { BrowserRouter as Router } from "react-router-dom";
//import { Amplify } from "aws-amplify";
//import config from "./config.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
const userType = localStorage.getItem('userType');

 if(userType == 'admin'){
  Amplify.configure(adminConfig)

 }else if(userType == 'customer'){
  Amplify.configure(customerConfig)
 }

/*
// Configure Amplify for the admin user pool
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

Amplify.configure(adminConfig);

// Configure Amplify for the customer user pool
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

const mergedConfig = {
  ...adminConfig,
  ...customerConfig,
};


// Initialize Amplify with the customer configuration
Amplify.configure(mergedConfig);
*/ 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

