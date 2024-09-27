import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as eventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path from "path";
import { UserPool } from "aws-cdk-lib/aws-cognito";

export class UserTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'UserTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "UserTable",
            stream: dynamodb.StreamViewType.NEW_IMAGE
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "trainers-by-club-id",
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'clubId', type: AttributeType.STRING },
        })

        const trainerTableServiceRole = new Role(this, 'TrainerTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        trainerTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/trainers-by-club-id`,
                ],
                actions: ['dymamodb:Query'],
            })
        )


    }
}