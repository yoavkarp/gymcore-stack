import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppSyncConstruct } from './appsync/appsync-construct';
import { CognitoConstruct } from './cognito/cognito-construct';
import { LayerConstruct } from './layers/layer-construct';
import { TenantConstruct } from './tenant-construct';
import membersLambda from './appsync/datasources/members-lambda';
import mongoose from 'mongoose';

const tenants = [{
    name: "HolmesPlace",
    databaseTenantId: "64db69f87e27a3bafccd3b02"
}]

class GymcoreCdkStack extends Stack {
    private readonly databaseLayer: LayerConstruct;
    private readonly tenants: TenantConstruct[];
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        this.databaseLayer = new LayerConstruct(this, 'db-layer', {
            layerFolder: 'db-layer',
        });

        this.tenants = tenants.map((tenant) =>
            new TenantConstruct(this, tenant.name, {
                name: tenant.name,
                lambdas: [
                    membersLambda(this, [this.databaseLayer.layerVersion], tenant.databaseTenantId),
                ]
            })
        )

    }
}

export {
    GymcoreCdkStack
}
