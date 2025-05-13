import { IMember, IQuery, IQueryGetWorkoutByIdArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { getMemberByIdPayload } from "../../actions/getMemberByIdPayload";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IQueryGetWorkoutByIdArgs, IQuery['getWorkoutById']> = async (event, context, callback) => {

    const {
        workoutId
    } = event.arguments;

    const { Item } = await dynamodb.get({
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        },
        TableName: "WorkoutTable"
    }).promise();

    return callback(undefined, Item as IWorkout);

}