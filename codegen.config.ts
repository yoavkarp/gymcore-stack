import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';
import fs from 'fs'
import { string } from 'zod';

const filesOrder = [
    'scalars',
    'schema',
].map((f) => `${f}.gql`)

export function createGraphQLSchema(directoryPath: string) {
    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);

    // Filter out only the GraphQL files
    const graphqlFiles = files.filter(file => file.endsWith('.gql'))
        .sort((a, b) => filesOrder.indexOf(a) - filesOrder.indexOf(b))

    // Combine the contents of all GraphQL files into a single string
    const combinedSchema = graphqlFiles.reduce((acc, file, index) => {
        const filePath = path.join(directoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return acc + `${acc.length > 0 ? `\n\n` : ""}# ${file}\n` + fileContent;
    }, '');

    return combinedSchema;
}

const f = createGraphQLSchema(path.join(__dirname, "src", "appsync", "graphql"));
fs.writeFileSync(path.join("src", "appsync", "schema.graphql"), f, 'utf-8');


const config: CodegenConfig = {
    overwrite: true,
    schema: path.join("src", "appsync", "schema.graphql"),
    generates: {
        [path.join("src", "appsync", "schema.ts")]: {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
            config: {
                scalars: {
                    "AWSDate": "string",
                    "AWSDateTime": "string",
                    "AWSTime": "string",
                    "AWSJSON": "{ [x: string]: any }",
                    "AWSPhone": "string",
                    "AWSURL": "string",
                    "AWSEmail": "string",
                    "AWSTimestamp": "number"
                },
                typesPrefix: "I",
            }
        }
    },
};

export default config;