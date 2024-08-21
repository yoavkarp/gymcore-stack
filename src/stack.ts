import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppSyncConstruct } from './appsync/appsync-construct';
import { CognitoConstruct } from './cognito/cognito-construct';
import { LayerConstruct } from './layers/layer-construct';

type GymcoreCdkStackProps = StackProps & {
    tenantName: string;
    tenantId: string;
}

class GymcoreCdkStack extends Stack {
    private readonly databaseLayer: LayerConstruct;
    private readonly auth: CognitoConstruct;
    private readonly appsync: AppSyncConstruct;
    constructor(scope: Construct, id: string, props: GymcoreCdkStackProps) {
        super(scope, id, props);

        this.databaseLayer = new LayerConstruct(this, 'db-layer', {
            layerFolder: 'db-layer',
        });

        this.auth = new CognitoConstruct(this, 'HolmesPlaceGymcoreAuth', {
            tenantName: 'HolmesPlaceGymcoreAuth',
            tenantId: props.tenantId
        })

        this.appsync = new AppSyncConstruct(this, 'HolmesPlaceGymcoreApi', {
            userPool: this.auth.userPool,
            name: "HolmesPlaceGymcoreApi",
            layers: [this.databaseLayer.layerVersion],
            tenantId: props.tenantId
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

export {
    GymcoreCdkStack
}
