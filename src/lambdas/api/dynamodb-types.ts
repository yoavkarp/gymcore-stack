import { DocumentClient } from "aws-sdk/clients/dynamodb"
import { dynamodb } from "./connection"

export type DynamoDBPut<T = { [x: string]: any }> = DocumentClient.PutItemInput & {
    type: "put",
    TableName: string,
    Item: T,
}

export type DynamoDBDelete<T = { [x: string]: any }> = DocumentClient.DeleteItemInput & {
    type: "delete",
    TableName: string,
    Item: T,
}

export type DynamoDBUpdate<T = { [x: string]: any }> = DocumentClient.UpdateItemInput & {
    type: "update",
    TableName: string,
    Key: T,
    UpdateExpression: string,
    ExpressionAttributeValues: { [key: string]: string },
    ExpressionAttributeNames: { [key: string]: string },
    ReturnValues: "UPDATED_NEW"
}

export type DynamoDBGetItem = DocumentClient.GetItemInput & {
    type: "get",
}

export type DynamoDBQuery = DocumentClient.QueryInput & {
    type: "query"
}

export type DynamoDBBatchGetItem = DocumentClient.BatchGetItemInput & {
    type: "batchGet"
}