import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Vpc } from "aws-cdk-lib/aws-ec2";

// Refer to the ResourceConstructTemplate.ts file first in same directory for refrence on changes done here //

export interface VPCProps {
  // insert properties you wish to expose or use with existing construct prop type
  // the example below we defined the props within the vpc constructor ( 3rd param )
}

export class VPCConstruct extends Construct {
  readonly VPC: Vpc; // this is now using VPC type not any as in the template
  constructor(
    scope: Construct,
    id: string,
    props?: VPCProps,
    envVariables?: any
  ) {
    super(scope, id);

    // Create new VPC with 2 Subnets
    this.VPC = new ec2.Vpc(this, id, {
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "vpc-name",
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });
  }
}
