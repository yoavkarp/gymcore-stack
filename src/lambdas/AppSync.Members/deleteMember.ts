import { Member, MutationDeleteMemberArgs } from "@/appsync/schema.types";
import { AppSyncResolver } from "../appsync.types";
import AWS from 'aws-sdk';
import { connectToDatabase, mongoose } from "@/layers/db-layer/nodejs";

const cognito = new AWS.CognitoIdentityServiceProvider();

let conn: mongoose.Connection;

export const deleteMember: AppSyncResolver<MutationDeleteMemberArgs, Member> = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (!conn) {
        conn = (await connectToDatabase()).connection;
    }

    return callback(undefined, {
        id: "",
        createdAt: String(Boolean(conn)),
        email: "",
        name: "",
        phoneNumber: "",
        status: "",
        updatedAt: ""
    })
}