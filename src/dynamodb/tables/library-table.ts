import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export class LibraryTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'LibraryTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId#clubId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "LibraryTable",
        })

        this.table.addGlobalSecondaryIndex({
            indexName: "library-by-club-id",
            partitionKey: { name: 'clubId', type: AttributeType.STRING },
            sortKey: { name: 'updated_at', type: AttributeType.STRING },
        })

        const libraryTableServiceRole = new Role(this, 'LibraryTableServiceRole', {
            assumedBy: new ServicePrincipal('dynamodb.amazonaws.com'),
        })

        libraryTableServiceRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [
                    `${this.table.tableArn}/index/library-by-club-id`
                ],
                actions: ['dymamodb:Query'],
            })
        )
    }
}

export type LibraryTableKey = {
    id: string,
    "tenantId#clubId": string
}