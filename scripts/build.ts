import { exec, execSync } from "child_process";
import tsconfig from "../tsconfig.json"

exec("graphql-codegen --config codegen.config.ts").on("message", (message) => console.log(message)).on("error", console.error).on("exit", (c) => {
    if (c !== 0) {
        console.error("Build failed at codegen");
        process.exit(c);
    }
    else {
        console.log("GraphQL codegen completed");
    }
    exec("npx tsc").on("message", (message, handle) => console.log("walle")).on("error", (message) => console.error(message.message)).on("exit", (c) => {
        if (c !== 0) {
            console.error("Build failed at tsc");
            process.exit(c);
        }
        console.log(`tsc build completed (outDir = ${tsconfig.compilerOptions.outDir})`);
    }).on("spawn", () => console.log("tsc spawned"));
});
