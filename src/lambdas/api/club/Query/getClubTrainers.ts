import { IQuery, ITrainer } from "@/appsync/schema";
import { AppSyncResolver } from "@/lambdas/appsync.types";
import { dynamodb } from "../../connection";
import { getClubTrainerIndexesPayload } from "../../actions/getClubTrainerIndexesPayload";
import { getClubTrainersPayload } from "../../actions/getClubTrainersPayload";

export const handler: AppSyncResolver<undefined, IQuery['getClubTrainers']> = async (event, context, callback) => {

    const clubId = event.identity?.sub!
    const indexes = await getClubTrainerIndexesPayload(clubId);

    const { Items } = await dynamodb.query(indexes).promise();

    if (!Items)
        return [];

    const trainers = await getClubTrainersPayload(event.identity?.claims?.["custom:tenantId"]!, Items.map((item) => item.id));

    const { Responses } = await dynamodb.batchGet(trainers).promise();

    if (!Responses || !Responses.TrainerTable) {
        return [];
    }

    return callback(undefined, Responses.TrainerTable as ITrainer[]);

}