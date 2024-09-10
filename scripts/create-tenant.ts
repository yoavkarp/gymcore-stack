import AWS from 'aws-sdk'
import { cognito } from '../auth-client/cognito';
import { cognitoisp } from '../aws-providers/cognito-isp';

const main = async () => {
    const Username = "0505716749"
    try {
        await cognitoisp.adminCreateUser({
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