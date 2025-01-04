import AWS from 'aws-sdk'

AWS.config.region = 'eu-central-1'
AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: "pumpreact",
})

const cognitoisp = new AWS.CognitoIdentityServiceProvider();

export { cognitoisp }