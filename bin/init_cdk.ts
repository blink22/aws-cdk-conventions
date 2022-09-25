#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InitCdkStack } from "../lib/init_cdk-stack";

const app = new cdk.App();
// here we define our app stacks, we can define multiple app stacks here and define dependencies between them
new InitCdkStack(app, "InitCdkStack");
