import chalk from "chalk";
import { execSync } from "child_process";
import fs, { Mode, OpenMode } from "fs";
import path from "path";
const layersPath = "src/layers";

fs.readdirSync(layersPath).forEach((layer) => {

    const layerPath = `${layersPath}/${layer.split(".")[0]}/nodejs/package.json`;

    if (!fs.existsSync(layerPath)) return;

    try {
        const packageJson = JSON.parse(fs.readFileSync(layerPath).toString());
        console.log(chalk.blueBright(` Installing ${layer}... `));
        execSync(`npm install --prefix ${layersPath}/${layer.split(".")[0]}/nodejs`);
        console.log(chalk.greenBright(` Successfuly installed ${layer}! `));
    }
    catch (e) {
        console.log(chalk.redBright(` Failed to install ${layer}! `, e));
    }

})