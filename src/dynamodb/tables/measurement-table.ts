import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class MeasurementTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'MeasurementTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "MeasurementTable"
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "measurements-by-member-id",
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'memberId', type: AttributeType.STRING }
        })

        const measurementTableServiceRole = new Role(this, 'MeasurementTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        measurementTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/measurements-by-member-id`,
                ],
                actions: ['dymamodb:Query'],
            })
        )

    }
}