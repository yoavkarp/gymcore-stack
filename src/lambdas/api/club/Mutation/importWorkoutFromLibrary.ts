import { IMutation, IMutationCreateWorkoutArgs, IMutationImportWorkoutFromLibraryArgs, IWorkout } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { randomUUID } from "crypto";
import { addCreateMetadata } from "../../actions/addMetadata";
import { dynamodb } from "../../connection";

export const handler: AppSyncResolver<IMutationImportWorkoutFromLibraryArgs, IMutation['importWorkoutFromLibrary']> = async (event, context, callback) => {

    const {
        input,
        workoutId,
        trainerId
    } = event.arguments;

    if (Object.keys(input).length !== 1) {
        return callback(new Error('Member or Plan is required'))
    }

    const clubId = event.identity?.sub!;

    const Item = {
        TableName: 'WorkoutTable',
        Key: {
            tenantId: event.identity?.claims?.['custom:tenantId'] || "",
            id: workoutId
        },
    }

    const { Item: workoutToImport } = await dynamodb.get(Item).promise()

    if (!workoutToImport) {
        return callback(new Error('Workout not found'))
    }

    // remove library props
    delete workoutToImport.memberId;
    delete workoutToImport.planId;
    delete workoutToImport.library;
    delete workoutToImport["tenantId#clubId#lib"];

    Object.assign(workoutToImport, {
        id: randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        trainerId
    });

    if (input.memberId) {
        Object.assign(workoutToImport, {
            memberId: input.memberId,
            'tenantId#memberId': `${process.env.TENANT_ID}#${input.memberId}`
        });
    }

    if (input.planId) {
        Object.assign(workoutToImport, {
            planId: input.planId,
            'tenantId#planId': `${process.env.TENANT_ID}#${input.planId}`
        });
    }

    await dynamodb.put({
        TableName: "WorkoutTable",
        Item: workoutToImport,
        ConditionExpression: 'attribute_not_exists(id)'
    }).promise()

    return callback(undefined, workoutToImport as IWorkout);

}