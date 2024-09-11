import tsconfig from "../tsconfig.json"
import { execAsync } from "./utils/execAsync";

const build = async () => {
    try {
        console.log("Building CDK Stack...")
        await execAsync(`rimraf`, tsconfig.compilerOptions.outDir);
        await execAsync(`graphql-codegen`, "--config", "codegen.config.ts");
        await execAsync("tsc")
        console.log("Build completed successfuly")
    }
    catch (e) {
        console.error(e)
    }
}

build()