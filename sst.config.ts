import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";
import { StorageStack } from "./stacks/StorageStack";
import { AdminAPIStack } from "./stacks/AdminAPIStack";
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
    .stack(AdminAPIStack);
  }
} satisfies SSTConfig;
