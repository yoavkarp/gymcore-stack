import { MutationInviteMemberArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../../appsync.types";
import AWS from 'aws-sdk';
import { getUserModel } from '@/layers/db-layer/nodejs'
import mongoose from "mongoose";

let conn: mongoose.Connection;
const cognito = new AWS.CognitoIdentityServiceProvider();

const uri = process.env.MONGODB_URI || "";

const connect = async function () {
    if (conn == null) {
        conn = mongoose.createConnection(uri, {
            serverSelectionTimeoutMS: 5000
        });

        // `await`ing connection after assigning to the `conn` variable
        // to avoid multiple function calls creating new connections
        await conn.asPromise();
    }

    return conn;
};

export const inviteMember: AppSyncResolver<MutationInviteMemberArgs> = async (event, context, callback) => {

    context.callbackWaitsForEmptyEventLoop = false;

    const {
        input: {
            email,
            name,
            phoneNumber
        }
    } = event.arguments;

    // define username
    const Username = phoneNumber;

    const user = await cognito.adminCreateUser({
        UserPoolId: process.env.USER_POOL_ID!,
        Username,
        TemporaryPassword: "12345678",
        UserAttributes: [
            {
                Name: 'email', // Specify the attribute name (e.g., email, phone_number, etc.)
                Value: email // Specify the attribute value
            },
            {
                Name: 'phone_number',
                Value: phoneNumber
            },
            {
                Name: 'name',
                Value: name
            },
            {
                Name: "email_verified",
                Value: "true"
            },
            {
                Name: "phone_number_verified",
                Value: "true"
            }
        ]
    }).promise()

    await cognito.adminAddUserToGroup({
        Username,
        UserPoolId: process.env.USER_POOL_ID!,
        GroupName: "invited"
    }).promise()

    const userId = user.User?.Attributes?.find(attr => attr.Name === "sub")?.Value;

    const UserModel = getUserModel(new mongoose.Types.ObjectId(process.env.tenantId!), conn);

    const UserItem = new UserModel({
        name,
        email,
        phoneNumber,
        role: "invited",
        userId,
        address: "",
        clubs: []
    })

    return callback(undefined, UserItem)
}