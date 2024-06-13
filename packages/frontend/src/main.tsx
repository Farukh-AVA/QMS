import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Amplify } from "aws-amplify";
import customerConfig  from "./CustomerConfig";
import adminConfig from "./AdminConfig";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';


 
const userType = sessionStorage.getItem('userType');
console.log(userType)
 if(userType == 'admin'){
  Amplify.configure(adminConfig)

 }else if(userType == 'customer'){
  Amplify.configure(customerConfig)
 }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

