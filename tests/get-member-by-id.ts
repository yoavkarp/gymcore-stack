import { dynamodb } from '../aws-providers/dynamodb-client'

dynamodb.query({
    IndexName: "workouts-by-member-id",
    KeyConditionExpression: "#PK = :PK",
    ExpressionAttributeNames: {
        "#PK": "tenantId#memberId"
    },
    ExpressionAttributeValues: {
        ":PK": "23b498e2-f0c1-7047-3bd1-a9fe0cd7f383#0314e872-9071-7076-f22e-9e6102cceda1"
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