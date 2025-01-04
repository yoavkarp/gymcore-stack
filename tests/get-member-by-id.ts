import { dynamodb } from '../aws-providers/dynamodb-client'

dynamodb.query({
    IndexName: "workouts-by-member-id",
    KeyConditionExpression: "#PK = :PK",
    ExpressionAttributeNames: {
        "#PK": "tenantId#memberId"
    },
    ExpressionAttributeValues: {
        ":PK": "6334c862-6041-7018-7094-9d7686054bd9#0314e872-9071-7076-f22e-9e6102cceda1"
    },
    TableName: "WorkoutTable"
}, (err, data) => {
    if (err) {
        console.error(err)
    }
    else {
        console.log(data)
    }
})