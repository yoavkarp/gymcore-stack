import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class GoalTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'GoalTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "GoalTable"
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "goals-by-member-id",
            partitionKey: { name: 'tenantId#memberId', type: AttributeType.STRING },
            sortKey: { name: 'created_at', type: AttributeType.STRING }
        })

        const goalTableServiceRole = new Role(this, 'GoalTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        goalTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/goals-by-member-id`,
                ],
                actions: ['dymamodb:Query'],
            })
        )

    }
}