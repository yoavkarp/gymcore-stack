import { Construct } from 'constructs';
import { AuthorizationType, BackedDataSource, FieldLogLevel, SchemaFile } from 'aws-cdk-lib/aws-appsync';
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import path from 'path';
import { CfnOutput } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import membersLambda from './datasources/members-lambda';
import { LayerConstruct } from '@/layers/layer-construct';
import { Function, ILayerVersion } from 'aws-cdk-lib/aws-lambda';

type AppSyncConstructProps = {
    userPool: UserPool;
    name: string;
    lambdas: Function[]
}

export class AppSyncConstruct extends Construct {
    public readonly api: GraphqlApi;
    public readonly dataSources: BackedDataSource[];

    constructor(scope: Construct, id: string, props: AppSyncConstructProps) {
        super(scope, id);

        // Define the AppSync API
        this.api = new GraphqlApi(this, `${props.name}_Api`, {
            name: props.name,
            schema: SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql')),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.USER_POOL,
                    userPoolConfig: {
                        userPool: props.userPool,
                    },
                },
            },
            logConfig: {
                fieldLogLevel: FieldLogLevel.ALL,
            },
            xrayEnabled: false,
        })

        this.dataSources = props.lambdas.map((lambda) => this.api.addLambdaDataSource(lambda.functionName, lambda));

        this.dataSources[0].createResolver(`Mutation.deleteMember`, {
            fieldName: "deleteMember",
            typeName: "Mutation"
        })

        new CfnOutput(this, 'GRAPHQL_URL', {
            value: this.api.graphqlUrl,
        })

        new CfnOutput(this, 'API_ID', {
            value: this.api.apiId,
        })

        new CfnOutput(this, 'API_KEY', {
            value: this.api.apiKey || "",
        })
    }
}