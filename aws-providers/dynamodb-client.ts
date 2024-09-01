import AWS from 'aws-sdk'

AWS.config.region = 'eu-central-1'
AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: "yoav",
})

const dynamodb = new AWS.DynamoDB.DocumentClient()

export { dynamodb }