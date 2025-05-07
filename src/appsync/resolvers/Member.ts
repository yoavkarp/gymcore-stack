import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IMember } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";
import { fromFileWithParams, oneQueryResult } from "../utils/vtl-templates";


export const resolver: (params: Record<string, string>) => ResolverType<IMember> = (params) => {
    return {
        measurement: {
            dataSourceName: "MeasurementTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Member.Measurement.req.vtl"),
                params),
            res: MappingTemplate.fromString(oneQueryResult),
        },
        goal: {
            dataSourceName: "GoalTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Member.Goal.req.vtl"), params),
            res: MappingTemplate.fromString(oneQueryResult),
        },
        profile_workouts: {
            dataSourceName: "WorkoutTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Member.ProfileWorkouts.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        plans: {
            dataSourceName: "PlanTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Member.Plans.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        },
        tenant: {
            dataSourceName: "TenantTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Member.Tenant.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        }
    }
}