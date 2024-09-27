import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export class WorkoutTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'WorkoutTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "WorkoutTable",
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "workouts-by-member-id",
            partitionKey: { name: 'tenantId#memberId', type: AttributeType.STRING },
            sortKey: { name: 'updated_at', type: AttributeType.STRING },
        })

        const workoutTableServiceRole = new Role(this, 'WorkoutTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        workoutTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/workouts-by-member-id`,
                ],
                actions: ['dymamodb:Query'],
            })
        )



    }
}