#!/usr/bin/env node

import { spawn, exec } from "child_process";
import tsconfig from "../tsconfig.json"
import { execAsync } from "./utils/execAsync";
import chalk from "chalk";

const build = async () => {
    try {
        console.log(chalk.bgBlueBright(" Building CDK Stack... "))
        await execAsync(`npx`, "rimraf", tsconfig.compilerOptions.outDir);
        await execAsync(`npx`, `graphql-codegen`, "--config", "codegen.config.ts");
        await execAsync(`npx`, "tsc")
        console.log(chalk.bgGreenBright(" Build completed successfuly "))
    }
    catch (e) {
        console.error(e)
    }
}

build()