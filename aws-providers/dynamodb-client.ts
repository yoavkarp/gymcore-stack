import AWS from 'aws-sdk'

AWS.config.region = 'eu-central-1'
AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: "pumpreact",
})

const dynamodb = new AWS.DynamoDB.DocumentClient()

export { dynamodb }