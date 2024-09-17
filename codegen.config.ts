import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';
import fs from 'fs'
import { string } from 'zod';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { print } from 'graphql';

// Load all `.gql` files from the specified directory
const typesArray = loadFilesSync('src/appsync/graphql/**/*.gql');

// Merge the loaded type definitions
const typeDefs = mergeTypeDefs(typesArray);

fs.writeFileSync(path.join("src", "appsync", "schema.graphql"), print(typeDefs), "utf-8");


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