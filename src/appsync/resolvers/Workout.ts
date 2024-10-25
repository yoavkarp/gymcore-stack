import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { IWorkout } from "../schema";
import { ResolverType } from "../types/ResolverType";
import path from "path";
import { mappingTemplatesPath } from "../utils/paths";

export const resolver: ResolverType<IWorkout> = {
    trainer: {
        dataSourceName: "TrainerTable",
        req: MappingTemplate.fromFile(path.join(mappingTemplatesPath, "Source.Trainer.req.vtl")),
        res: MappingTemplate.dynamoDbResultItem(),
    },
}