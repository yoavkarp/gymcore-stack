import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IPlan } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";
import { oneQueryResult } from "../utils/vtl-templates";

export const resolver: ResolverType<IPlan> = {
    workouts: {
        dataSourceName: "WorkoutTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Plan.Workouts.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
    member: {
        dataSourceName: "MemberTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Plan.Member.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
    events: {
        dataSourceName: "EventTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Plan.Events.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem()
    }
}