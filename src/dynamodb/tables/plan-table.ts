import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class PlanTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'PlanTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "PlanTable"
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "plans-by-member-id",
            partitionKey: { name: "tenantId#memberId", type: AttributeType.STRING },
            sortKey: { name: "updated_at", type: AttributeType.STRING }
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "plans-by-trainer-id",
            partitionKey: { name: "tenantId#trainerId", type: AttributeType.STRING },
            sortKey: { name: "updated_at", type: AttributeType.STRING }
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "plans-by-club-id",
            partitionKey: { name: "tenantId#clubId", type: AttributeType.STRING },
            sortKey: { name: "updated_at", type: AttributeType.STRING }
        })

        const planTableServiceRole = new Role(this, 'PlanTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        planTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/plans-by-member-id`,
                    `${this.table.tableArn}/index/plans-by-trainer-id`,
                    `${this.table.tableArn}/index/plans-by-club-id`,
                ],
                actions: ['dymamodb:Query'],
            })
        )

    }
}