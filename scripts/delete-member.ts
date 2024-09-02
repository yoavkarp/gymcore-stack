import AWS from 'aws-sdk'

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: "yoav" })
AWS.config.region = "eu-central-1"

const dynamodb = new AWS.DynamoDB.DocumentClient()
const cognito = new AWS.CognitoIdentityServiceProvider()

const deleteMember = async ({ phone_number, tenantId }: { phone_number: string, tenantId: string }) => {

    const { Username, UserAttributes } = await cognito.adminGetUser({
        UserPoolId: "eu-central-1_rPC74KFyx",
        Username: phone_number.substring(4),
    }).promise()

    const res = await cognito.adminDeleteUser({
        UserPoolId: "eu-central-1_rPC74KFyx",
        Username
    }).promise()

    await dynamodb.delete({
        TableName: "MemberTable",
        Key: {
            id: UserAttributes?.find(attr => attr.Name === "sub")?.Value,
            tenantId: tenantId
        }
    }).promise()

}

deleteMember({ phone_number: "+9720505716745", tenantId: "d4258a0f-85a5-4c0b-b95a-f9c861e0a00c" })