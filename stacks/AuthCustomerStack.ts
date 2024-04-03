import { CustomerAPIStack } from "./CustomerAPIStack";

import { Cognito, StackContext, use } from "sst/constructs";

export function AuthCustomerStack({ stack, app }: StackContext) {
  const { api } = use(CustomerAPIStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "AuthCustomer", {
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,

  ]);

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  // Return the auth resource
  return {
    auth,
  };
}