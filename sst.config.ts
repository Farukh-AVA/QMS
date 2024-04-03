import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";
import { StorageStack } from "./stacks/StorageStack";
import { AdminAPIStack } from "./stacks/AdminAPIStack";
import { CustomerAPIStack } from "./stacks/CustomerAPIStack";
import { AuthAdminStack } from "./stacks/AuthAdminStack"; 
import { AuthCustomerStack } from "./stacks/AuthCustomerStack";
import { FrontendStack } from "./stacks/FrontendStack";
export default {
  config(_input) {
    return {
      name: "qms",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
    .stack(ExampleStack)
    .stack(StorageStack)
    .stack(AdminAPIStack)
    .stack(CustomerAPIStack)
    .stack(AuthAdminStack)
    .stack(AuthCustomerStack)
    .stack(FrontendStack); 
  },
} satisfies SSTConfig;
