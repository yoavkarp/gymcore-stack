import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class TenantTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'TenantTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'id', type: AttributeType.STRING },
            tableName: "TenantTable"
        })

    }
}