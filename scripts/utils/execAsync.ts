import { spawn } from "child_process";

export const execAsync = (command: string, ...args: string[]) => new Promise((resolve, reject) => {
    const child = spawn(command, args, {
        stdio: "inherit", cwd: process.cwd(),
        shell: true
    });

    child.on("message", console.log)
    child.on("error", console.error)
    child.on("exit", (exitCode) => {
        if (exitCode === 0) {
            resolve("success")
        }
        else {
            reject(`Error: process exit with code: ${exitCode}`)
        }
    })
    child.on("close", (exitCode) => {
        if (exitCode === 0) {
            resolve("success")
        }
        else {
            reject(`Error: process exit with code: ${exitCode}`)
        }
    })
})