import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IQuery } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";

export const resolver: ResolverType<IQuery> = {
    getClubById: {
        dataSourceName: "api"
    },
    getMemberById: {
        dataSourceName: "api"
    },
    getTenant: {
        dataSourceName: "api"
    },
    searchMembers: {
        dataSourceName: "api"
    },
    getClubTrainers: {
        dataSourceName: "api"
    },
    getWorkoutById: {
        dataSourceName: "api"
    },
    listLibraryWorkouts: {
        dataSourceName: "WorkoutTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Query.ListLibraryWorkouts.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    }
}
