import { Api, Config, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export function AdminAPIStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
    //This will allow our API to access our table    
        bind: [table]
      },
    },
    routes: {
      "POST /queue": "packages/functions/src/admin/create.main",
      "GET /queue/{id}": "packages/functions/src/admin/get.main",
      "GET /queue": "packages/functions/src/admin/list.main",
      "PUT /queue/{id}": "packages/functions/src/admin/update.main",
      "DELETE /queue/{id}": "packages/functions/src/admin/delet.main",
      "POST /message": "packages/functions/src/admin/message.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}