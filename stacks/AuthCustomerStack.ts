import { CustomerAPIStack } from "./CustomerAPIStack";

import { Cognito, StackContext, use } from "sst/constructs";

export function AuthCustomerStack({ stack, app }: StackContext) {
  const { apiCustomer } = use(CustomerAPIStack);

  // Create a Cognito User Pool and Identity Pool
  const authCustomer = new Cognito(stack, "AuthCustomer", {
    login: ["email"],
  });

  authCustomer.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    apiCustomer,

  ]);
 
  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: authCustomer.userPoolId,
    UserPoolClientId: authCustomer.userPoolClientId,
    IdentityPoolId: authCustomer.cognitoIdentityPoolId,
  });

  // Return the auth resource
  return {
    authCustomer,
  };
}