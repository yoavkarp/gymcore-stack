import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IWorkout } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";
import { fromFileWithParams } from "../utils/vtl-templates";

export const resolver: (params: Record<string, string>) => ResolverType<IWorkout> = (params) => {
    return {
        trainer: {
            dataSourceName: "TrainerTable",
            req: fromFileWithParams(path.join(mappingTemplatesPath, "Source.Trainer.req.vtl"), params),
            res: MappingTemplate.dynamoDbResultItem(),
        }
    }
}