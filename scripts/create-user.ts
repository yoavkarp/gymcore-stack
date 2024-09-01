import AWS from 'aws-sdk'
import { cognito } from '../auth-client/cognito';

AWS.config.region = 'eu-central-1'
AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: "yoav",
})

const CognitoISP = new AWS.CognitoIdentityServiceProvider();

const main = async () => {
    const Username = "0505716749"
    try {
        await CognitoISP.adminCreateUser({
            Username,
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
    }
    catch (e) {
        console.log(e)
    }

    await cognito.login("+9720505716749", "Abcd1234!@")
}

main();