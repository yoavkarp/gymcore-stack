import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { readFileSync } from "fs";

export const oneQueryResult = `
    #if($ctx.result.items.size() > 0)
        $util.toJson($ctx.result.items[0])
    #else
        $util.toJson(null)
    #end
`

export const fromFileWithParams = (path: string, params: Record<string, string>) => {
    const fileContent = readFileSync(path, "utf-8");

    let template = MappingTemplate.fromString(
        Object.entries(params).reduce((acc, [key, value]) => {
            const addParam = `#set($${key} = "${value}")`;
            return addParam + "\n" + acc;
        }, fileContent)
    )

    return template;
}