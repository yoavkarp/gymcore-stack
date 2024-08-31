import AWS from 'aws-sdk'

AWS.config.region = 'eu-central-1'
AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: "yoav"
})

const CognitoISP = new AWS.CognitoIdentityServiceProvider();

CognitoISP.adminCreateUser({
    Username: "0505716749",
    UserPoolId: "eu-central-1_rPC74KFyx",
    TemporaryPassword: "Abcd1234!@",
    UserAttributes: [
        {
            Name: 'phone_number',
            Value: "+9720505716749"
        },
        {
            Name: "phone_number_verified",
            Value: "true"
        },
        {
            Name: "email",
            Value: "yoavkarp@gmail.com"
        },
        {
            Name: "email_verified",
            Value: "true"
        }
    ]
}).promise()