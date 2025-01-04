import { IQuery, IQuerySearchExercisesArgs } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import exercises from '../../assets/exercises.json';

const LIMIT = 10;

export const handler: AppSyncResolver<IQuerySearchExercisesArgs, IQuery['searchExercises']> = async (event, context, callback) => {

    const {
        query
    } = event.arguments;

    const sanitized = query.trim().toLowerCase()

    if (!/^[a-z0-9\u0590-\u05FF\s\-]+$/.test(sanitized)) {
        return callback(new Error("only letters (hebrew and english), space and dash (-)"))
    }

    const results = [];

    for (let i = 0; i < exercises.length; i++) {

        let searchInside = `${exercises[i].hebrew} ${exercises[i].equipment_hebrew} ${exercises[i].equipment.toLowerCase()} ${exercises[i].search}`

        if (sanitized.split(" ").every((val) => searchInside.includes(val))) {
            results.push(exercises[i]);

            if (results.length === LIMIT) {
                break;
            }
        }
    }

    return callback(undefined, { items: results });
}