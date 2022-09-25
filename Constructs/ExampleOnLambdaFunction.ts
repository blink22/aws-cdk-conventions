import { LambdaFunctionProps } from "aws-cdk-lib/aws-events-targets";
import { Construct } from "constructs";
import { AssetCode, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

// Refer to the ExampleOnVpc.ts file in same directory for how to use this template //

export interface LambdFunctionProps {
  // insert properties you wish to expose or use with existing construct prop type
}

export class TestLambdaFunction extends Construct {
  readonly testLambdaFunction: NodejsFunction;
  constructor(
    scope: Construct,
    id: string,
    props?: LambdaFunctionProps,
    envVariables?: any
  ) {
    super(scope, id);

    this.testLambdaFunction = new NodejsFunction(this, id, {
      functionName: "test-func-name",
      entry: path.join(__dirname, "../src/Handlers/testLambdaFunction.ts"),
      handler: "handler",
      runtime: Runtime.NODEJS_14_X,
    });
  }
}
