import { Construct } from "constructs";

// Refer to the ExampleOnVpc.ts file in same directory for how to use this template //

export interface ExamplePropsForConstructs {
  // insert properties you wish to expose or use with existing construct prop type
}

export class ExampleConstruct extends Construct {
  readonly exportedResource: any; // should use the resource data type not any
  constructor(scope: Construct, id: string, props?: any, envVariables?: any) {
    super(scope, id);
    // this.exportedResource = undefined; // this should be replace with the actual resource constructor call
  }
}
