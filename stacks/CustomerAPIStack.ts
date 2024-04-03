import { Api, Config, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function CustomerAPIStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // Create the API
  const apiCustomer = new Api(stack, "customerApi", {
    defaults: {
      function: {
    //This will allow our API to access our table    
        bind: [table],
        
      },
    },
    routes: {
      "POST /queue": "packages/functions/src/customer/create.main",
      "GET /queue": "packages/functions/src/customer/list.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: apiCustomer.url,
  });

  // Return the API resource
  return {
    apiCustomer,
  };
}