import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

// Refer to the ResourceConstructTemplate.ts file first in same directory for refrence on changes done here //

export interface LambdaRestApiProps {
  handler: IFunction;
  proxy: boolean;
}

export class LambdaRestAPI extends Construct {
  readonly LambdaRestApi: apiGateway.LambdaRestApi;
  constructor(
    scope: Construct,
    id: string,
    props: LambdaRestApiProps,
    envVariables?: any
  ) {
    super(scope, id);
    this.LambdaRestApi = new apiGateway.LambdaRestApi(this, id, {
      ...props,
      restApiName: "Test-Lambda-Rest-Api",
    });

    // resource name maps to the endpoint ' /test '
    const testEndpoint = this.LambdaRestApi.root.addResource("test");
    // defines the method used to invoke the endpoint
    testEndpoint.addMethod("GET");
  }
}
