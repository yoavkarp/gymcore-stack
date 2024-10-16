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
    },
    listPlansByMemberId: {
        dataSourceName: "PlanTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Query.ListPlansByMember.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
    listPlansByClub: {
        dataSourceName: "PlanTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Query.ListPlansByClub.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
    listPlansByTrainerId: {
        dataSourceName: "PlanTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Query.ListPlansByTrainer.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
    getPlanById: {
        dataSourceName: "api"
    },
    getActiveWorkout: {
        dataSourceName: "api"
    },
    listActiveWorkoutsHistory: {
        dataSourceName: "ActiveWorkoutTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Query.ListActiveWorkoutsHistory.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    }
}
