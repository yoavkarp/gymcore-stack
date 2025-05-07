import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IPlan } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";
import { fromFileWithParams, oneQueryResult } from "../utils/vtl-templates";
export const resolver: (params: Record<string, string>) => ResolverType<IPlan> = (params) => {
    return {
        workouts: {
            dataSourceName: "WorkoutTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Plan.Workouts.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        member: {
            dataSourceName: "MemberTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Plan.Member.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        events: {
            dataSourceName: "EventTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Plan.Events.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem()
        },
        trainer: {
            dataSourceName: "TrainerTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Source.Trainer.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem()
        },
        activeWorkouts: {
            dataSourceName: "ActiveWorkoutTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Plan.ActiveWorkouts.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem()
        }
    }
}