import { StackContext, StaticSite, use } from "sst/constructs";
//import { ApiStack } from "./ApiStack";
import { AdminAPIStack } from "./AdminAPIStack";
import { CustomerAPIStack } from "./CustomerAPIStack";
//import { AuthStack } from "./AuthStack";
import { AuthAdminStack } from "./AuthAdminStack";
import { AuthCustomerStack } from "./AuthCustomerStack";
import { StorageStack } from "./StorageStack";
import { ExampleStack } from "./ExampleStack"

export function FrontendStack({ stack, app }: StackContext) {
  //const { api } = use(ApiStack);
  const { api } = use(AdminAPIStack);
  const { apiCustomer } = use(CustomerAPIStack);
  //const { auth } = use(AuthStack);
  const { auth } = use(AuthAdminStack);
  const { authCustomer } = use(AuthCustomerStack);
  const { table } = use(StorageStack);
  const { apiWebsocket } = use(ExampleStack); 

  // Define our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "dist",
    // Pass in our environment variables
    environment: {
      VITE_API_ADMIN_URL: api.url,
      VITE_API_CUSTOMER_URL: apiCustomer.url,
      VITE_REGION: app.region,
      VITE_TABLE: table.tableName,
      VITE_ADMIN_USER_POOL_ID: auth.userPoolId,
      VITE_ADMIN_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      VITE_ADMIN_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
      VITE_CUSTOMER_USER_POOL_ID: authCustomer.userPoolId,
      VITE_CUSTOMER_USER_POOL_CLIENT_ID: authCustomer.userPoolClientId,
      VITE_CUSTOMER_IDENTITY_POOL_ID: authCustomer.cognitoIdentityPoolId || "",
      VITE_API_WEBSOCKET_URL: apiWebsocket.url,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}