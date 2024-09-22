import { dynamodb } from "./connection"

export type DynamoDBPut<T = { [x: string]: any }> = {
    type: "put",
    TableName: string,
    Item: T,
}

export type DynamoDBDelete<T = { [x: string]: any }> = {
    type: "delete",
    TableName: string,
    Item: T,
}

export type DynamoDBUpdate<T = { [x: string]: any }> = {
    type: "update",
    TableName: string,
    Key: T,
    UpdateExpression: string,
    ExpressionAttributeValues: { [key: string]: string },
    ExpressionAttributeNames: { [key: string]: string },
    ReturnValues: "UPDATED_NEW"
}

export type DynamoDBGet<T = { [x: string]: any }> = {
    type: "get",
    TableName: string,
    Key: { [key: string]: any },
}