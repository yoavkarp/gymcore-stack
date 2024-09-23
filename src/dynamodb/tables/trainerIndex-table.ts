import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class TrainerIndexTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'TrainerIndexTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'trainerId_clubId', type: AttributeType.STRING },
            tableName: "TrainerIndexTable"
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