# CDK TypeScript project

This is a project template for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template



## Prerequisites For Using AWS CDK

1- Prior knowledge of AWS Services

2- AWS CLI Installed

3- AWS Credentials and Configs

4- Exploring/Considering Using Typescript + AWS CDK In Your Project

5- Solid Knowledge In Typescript

6- Good To Have Use AWS Serverless Knowledge Before Migrating To CDK

Important URLS To Checkout/Skim read :

Aws Serverless : https://aws.amazon.com/serverless/

Aws CDK : https://aws.amazon.com/cdk/

SST Framework on top of CDK : https://sst.dev/
( To know/read about – not yet stable but provides extra functionality )

Aws Services List : Service List

AWS Github Repo With CDK Examples :
https://github.com/aws-samples/aws-cdk-examples/

AWS CDK Crash Course :
https://www.youtube.com/watch?v=T-H4nJQyMig

## What is CDK ? :

Amazon CDK stands for Cloud Development Kit, its an open source framework that helps the developer define his application resources, create infrastructure easily and create re-usable/shareable components ( services like : Apigateway, Database, VPC, etc .. )

How CDK Facilitates Resource Creation?

CDK provides a library of Constructs , these constructs are components that has configuration detail, boilerplate and logic for using one or multiple AWS services.

This enables you to define your applications' infrastructure at a high level. Additionally, constructs are adjustable, You can easily change any of the parameters or encode your own custom construct.

These constructs are created in the appstack file, which is then synthesized/transformed into AWS CloudFormation

Example On Appstack.ts file :

![carbon (1)](https://user-images.githubusercontent.com/26199518/192157532-f5ef0f13-b132-4221-91c5-412fb1e20360.png)



this is how we define our appstack, this later gets transformed into CFN ( CloudFormation )

Next Example On How We Define Our Resources :

![carbon (2)](https://user-images.githubusercontent.com/26199518/192157549-e2b09e00-ce22-4841-ae16-1e515c905c9a.png)


here we define a new queue using constructs, info about usable constructs and services can be found at https://docs.aws.amazon.com/cdk/api/v1/docs/aws-construct-library.html

## How To Start a new CDK project ?
( Perquisite : having Node.js and NPM installed )
To get started first we have to install the CDK CLI using one of the following commands

`npm install -g aws-cdk` # install latest version

`npm install -g aws-cdk@X.YY.Z` # install specific version

then we use the command : cdk init --language=typescript

and as mentioned above, we navigate to our application stack file, find our stack class, define our resources within the constructor

and use the CDK CLI commands for the needed operation

operations available are :

cdk init  
( we already used this to initialize the app )

cdk synth
( we use this for compiling our AWS CDK application into an AWS CloudFormation template. )

cdk bootstrap
( this is used to init the CFN for the aws account we are deploying on , this must be run before the cdk deploy command when initializing )

cdk deploy
( we use this for deployment to our different environments )
Important Note :
we need to have the aws configs and credentials exported into the current terminal we are running these commands from in order to correctly deploy to an environments, if not provided, cdk will use default ones

cdk diff
( see differences between your local AWS CDK code and the running application in AWS. )

and a lot more , so for more info about CDK Cli commands and for guide lines please see https://docs.aws.amazon.com/cdk/v2/guide/cli.html

## Suggested Infrastructure and best practice

how we define our infrastructure and app stack :

![stackAndInfra](https://user-images.githubusercontent.com/26199518/192157599-48f23da8-f1c9-44cd-a452-b2a7c4dc27b9.png)


We create the infrastructure directory on the same package/directory level as the project src and stacks, the src and the stacks directories gets created automatically using the cdk init command

within the infrastructure directory we have for each resource a factory/Initializer class, in order to avoid cramming the app stack file , for better readability and easy resource sharing between stacks if needed

Generic Example Provided Below On Resources Inside Infrastructure Dir:

![carbon (4)](https://user-images.githubusercontent.com/26199518/192157645-1dd2df43-d747-4687-a1ef-d4989846070e.png)



and using this template we can generate a Queue ( SQS ), below is a second example defining a queue :

![carbon (6)](https://user-images.githubusercontent.com/26199518/192157750-bd35b5d9-cc8b-463c-82a8-2338e13143db.png)


Then this new class that creates the queue gets called in the appstack.ts file, when app stack gets synthesized, the injected queue resource gets compiled into the CFN with all the properties and configs declared

then using the command `cdk bootstrap --profile <our account value>`

this will init the CFN on our aws account, then we follow this command with the `cdk deploy --profile <our account value>` to deploy our newly created stack

Also best practices suggest that we create multiple app stacks, each app stack has a set of resources that are dependent on each other but not on other resources of other stacks

for example we might need to be regularly updating a stack which includes our api gateway or lambda functions, but we do not need to update the database resource

so creating a stack with our ApiGateway resource and another stack for our database resource makes more sense as we are in a continued state of adding more endpoints and making updates more frequently than we do to our database

also we have the ability to declare dependence between app stacks so that when we trigger the deploy command, each stack will check for its provider/dependent and will wait for its deployment and creation first
