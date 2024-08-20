import { Construct } from 'constructs';
import { AuthorizationType, FieldLogLevel, SchemaFile } from 'aws-cdk-lib/aws-appsync';
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import path from 'path';
import { CfnOutput } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { CognitoConstruct } from './cognito/cognito-construct';
import { AppSyncConstruct } from './appsync/appsync-construct';
import { Function, ILayerVersion } from 'aws-cdk-lib/aws-lambda';

type TenantConstructProps = {
    name: string,
    lambdas: Function[];
}

export class TenantConstruct extends Construct {
    public readonly appsync: AppSyncConstruct;
    public readonly auth: CognitoConstruct;

    constructor(scope: Construct, id: string, props: TenantConstructProps) {
        super(scope, id);

        // lambdas


        this.auth = new CognitoConstruct(this, props.name, {
            name: props.name
        })

        this.auth = new CognitoConstruct(this, 'HolmesPlaceGymcoreAuth', {
            name: 'HolmesPlaceGymcoreAuth'
        })

        this.appsync = new AppSyncConstruct(this, 'HolmesPlaceGymcoreApi', {
            userPool: this.auth.userPool,
            name: "HolmesPlaceGymcoreApi",
            lambdas: props.lambdas
        })

        new CfnOutput(this, 'GRAPHQL_URL', {
            value: this.appsync.api.graphqlUrl,
        })

        new CfnOutput(this, 'API_ID', {
            value: this.appsync.api.apiId,
        })

        new CfnOutput(this, 'API_KEY', {
            value: this.appsync.api.apiKey || "",
        })
    }
}