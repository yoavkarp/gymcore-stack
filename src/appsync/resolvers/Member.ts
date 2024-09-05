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
    }
}