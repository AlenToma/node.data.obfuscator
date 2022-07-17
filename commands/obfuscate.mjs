//import iconf from 'conf';
import fs from 'fs'

import obfuscator from './obfuscator.mjs'
//const conf = new iconf();
import chalk from 'chalk';

function shuffle({ file, counter, path, type, overwrite, includeTypeInImport }) {
    try {
        if (!path || path.length <= 1) {
            console.log(
                chalk.red.bold(`"${path}" is invalid`)
            );
            return;
        }
        if (!fs.existsSync(path))
            fs.mkdirSync(path);
        if (!type)
            type = "js";

        const text = fs.readFileSync(file, "utf8");
        function isJson() {
            try {
                JSON.parse(text);
            } catch (e) {
                return false;
            }
            return true;
        }




        const files = obfuscator(text, true, counter, type, isJson(), includeTypeInImport);
        const folderContent = fs.readdirSync(path);
        if (folderContent.length > 0) {
            if (!overwrite) {
                console.log(
                    chalk.red.bold(`"${path}" already containe some data, please remove them or add --overwrite command to remove them automatically`)
                )
                return
            }
        }
        for (var f of folderContent)
            fs.unlinkSync(path + "/" + f);
        for (let f of files) {
            var fp = path + "/" + f.name + "." + type;
            console.log(chalk.greenBright(`Writing ${fp}`));
            fs.writeFileSync(fp, f.content, "utf8");
        }
    } catch (e) {
        console.log(e);
    }
}

export default shuffle;
