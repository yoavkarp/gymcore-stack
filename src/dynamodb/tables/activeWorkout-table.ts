import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export class ActiveWorkoutTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'ActiveWorkoutTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "ActiveWorkoutTable",
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "active-workouts-by-member-id",
            partitionKey: { name: 'tenantId#memberId', type: AttributeType.STRING },
            sortKey: { name: 'updated_at', type: AttributeType.STRING },
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "active-workouts-by-plan-id",
            partitionKey: { name: 'tenantId#planId', type: AttributeType.STRING },
            sortKey: { name: 'updated_at', type: AttributeType.STRING },
        })

        const activeWorkoutTableServiceRole = new Role(this, 'ActiveWorkoutTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        activeWorkoutTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/active-workouts-by-member-id`,
                    `${this.table.tableArn}/index/active-workouts-by-plan-id`,
                ],
                actions: ['dymamodb:Query'],
            })
        )



    }
}