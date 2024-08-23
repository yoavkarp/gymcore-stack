import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class UserTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'UserTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "UserTable"
        })

        // const userTableServiceRole = new Role(this, 'UserTableServiceRole', {
        //     assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        // })

        // userTableServiceRole.addToPolicy(
        //     new PolicyStatement({
        //         effect: Effect.ALLOW,
        //         resources: [
        //             `${this.table.tableArn}/index/???`,
        //         ],
        //         actions: ['dymamodb:Query'],
        //     })
        // )

    }
}