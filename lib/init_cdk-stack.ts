import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { VPCConstruct } from "../Constructs/ExampleOnVPC";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { QueueEncryption } from "aws-cdk-lib/aws-sqs";
import { LambdaRestAPI } from "../Constructs/ExampleOnLambdaRestAPI";
import { TestLambdaFunction } from "../Constructs/ExampleOnLambdaFunction";
// import { ExampleConstruct } from "../Constructs/ResourceConstructTemplate";

export class InitCdkStack extends cdk.Stack {
  // defining a object of key,value types of strings to be used as a shared env between resources
  stackSharedEnv: Record<string, string>;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack resources goes here //

    // created using the vpc construct template we defined
    const vpc = new VPCConstruct(this, "test-vpc").VPC;

    // created using the Lambda Function construct template we defined
    const testLambdaFunction = new TestLambdaFunction(
      this,
      "test-lambda-function"
    ).testLambdaFunction;

    // created using the apigateway construct template we defined
    const apiGateway = new LambdaRestAPI(this, "test-api-gateway", {
      handler: testLambdaFunction,
      proxy: false,
    }).LambdaRestApi;

    // example resource without using our defined construct class
    const queue = new sqs.Queue(this, "InitCdkQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
      encryption: QueueEncryption.KMS_MANAGED,
      queueName: "queue-name.fifo", //fifo queues name must end with '.fifo'
      fifo: true,
    });

    // const resource = new ExampleConstruct(scope, "resource-id", resourceProps,stackSharedEnv).exportedResource;

    // this line is used to print and share resource urls
    // new cdk.CfnOutput(this, "resourceUrl", { value: resource });
  }
}
