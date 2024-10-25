import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IMember } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";
import { oneQueryResult } from "../utils/vtl-templates";

export const resolver: ResolverType<IMember> = {
    measurement: {
        dataSourceName: "MeasurementTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Member.Measurement.req.vtl")),
        res: MappingTemplate.fromString(oneQueryResult),
    },
    goal: {
        dataSourceName: "GoalTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Member.Goal.req.vtl")),
        res: MappingTemplate.fromString(oneQueryResult),
    },
    profile_workouts: {
        dataSourceName: "WorkoutTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Member.ProfileWorkouts.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
    plans: {
        dataSourceName: "PlanTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Member.Plans.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
    tenant: {
        dataSourceName: "TenantTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Member.Tenant.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    }
}