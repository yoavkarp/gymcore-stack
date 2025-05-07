import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IQuery } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";
import { fromFileWithParams } from "../utils/vtl-templates";

export const resolver: (params: Record<string, string>) => ResolverType<IQuery> = (params) => {
    return {
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
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Query.ListLibraryWorkouts.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        listPlansByMemberId: {
            dataSourceName: "PlanTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Query.ListPlansByMember.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        listPlansByClub: {
            dataSourceName: "PlanTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Query.ListPlansByClub.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        listPlansByTrainerId: {
            dataSourceName: "PlanTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Query.ListPlansByTrainer.req.vtl"), params),
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
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Query.ListActiveWorkoutsHistory.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        getCurrentMember: {
            dataSourceName: "MemberTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Query.GetCurrentMember.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        searchExercises: {
            dataSourceName: "api"
        }
    }
}