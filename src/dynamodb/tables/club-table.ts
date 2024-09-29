import { IClub } from "@/appsync/schema";
import { RemovalPolicy } from "aws-cdk-lib";
import { Table, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { Role, ServicePrincipal, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class ClubTableConstruct extends Construct {

    readonly table: Table;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.table = new Table(this, 'ClubTable', {
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST,
            partitionKey: { name: 'tenantId', type: AttributeType.STRING },
            sortKey: { name: 'id', type: AttributeType.STRING },
            tableName: "ClubTable"
        })

    }
}

export type ClubTableKey = {
    tenantId: string,
    id?: string
}

export type ClubTableItem = ClubTableKey & {
    email: string,
    phone_number: string,
    profile_picture: string,
    address: string,
    name: string,
    created_at: string,
    updated_at: string,
}