import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class TrainerClubTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'TrainerClubTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'clubId#trainerId', type: AttributeType.STRING },
            tableName: "TrainerClubTable"
        })

        // const trainerClubTableServiceRole = new Role(this, 'TrainerClubTableServiceRole', {
        //     assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        // })

        // trainerClubTableServiceRole.addToPolicy(
        //     new PolicyStatement({
        //         effect: Effect.ALLOW,
        //         resources: [
        //             `${this.table.tableArn}/index/trainers-by-club-id`,
        //         ],
        //         actions: ['dymamodb:Query'],
        //     })
        // )

    }
}