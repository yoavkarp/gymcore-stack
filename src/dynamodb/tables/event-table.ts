import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class EventTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'EventTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "EventTable"
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "events-by-member-id",
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'memberId', type: AttributeType.STRING }
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "events-by-trainer-id",
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'trainerId', type: AttributeType.STRING }
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "events-by-club-id",
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'clubId', type: AttributeType.STRING }
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "events-by-plan-id",
            partitionKey: { name: 'tenantId#planId', type: AttributeType.STRING },
            sortKey: { name: 'start_at', type: AttributeType.STRING }
        })

        const eventTableServiceRole = new Role(this, 'EventTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        eventTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/events-by-member-id`,
                    `${this.table.tableArn}/index/events-by-trainer-id`,
                    `${this.table.tableArn}/index/events-by-club-id`
                ],
                actions: ['dymamodb:Query'],
            })
        )

    }
}