import { execSync } from "child_process";
import fs from "fs";
const layersPath = "src/layers";

fs.readdirSync(layersPath).forEach((layer) => {
    const layerPath = `${layersPath}/${layer.split(".")[0]}/nodejs/package.json`;
    try {
        const packageJson = JSON.parse(fs.readFileSync(layerPath).toString());
        console.log(`Installing ${layer}...`);
        execSync(`npm install --prefix ${layersPath}/${layer.split(".")[0]}/nodejs`);
        console.log(`Installed ${layer}!`);
    }
    catch (e) {

    }

})