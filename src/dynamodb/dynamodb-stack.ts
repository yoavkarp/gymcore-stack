import { Stack, StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import fs from 'fs';
import path from 'path';

export class DynamoDBStack extends Stack {
    public readonly tables: {
        userTable: Table;
        memberTable: Table;
        tenantTable: Table;
        clubTable: Table;
        trainerTable: Table;
        measurementTable: Table;
        eventTable: Table;
        goalTable: Table;
        trainerIndexTable: Table;
    }

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const files = fs.readdirSync(path.join(__dirname, "tables"));
        const tables: Record<string, Table> = {}
        for (const file of files) {
            if (file.endsWith('-table.ts') || file.endsWith('-table.js')) {
                const filePath = path.join(__dirname, "tables", file);
                const tableConstruct = require(filePath); // Dynamically import table construct
                const t = new tableConstruct[Object.keys(tableConstruct)[0]](this, Object.keys(tableConstruct)[0]); // Instantiate table construct
                tables[`${file.split("-table")[0]}Table`] = t.table;
            }
        }
        this.tables = tables as any;
    }
}