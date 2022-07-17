#! /usr/bin/env node
import { program } from 'commander'
import Obfuscate from './commands/obfuscate.mjs';

program
    .command('secure')
    .description('Obfuscator and secure your data. be it json or text')
    .option('-f, --file <file>', "file path eg './mydata.[json|txt|ts etc..]', that containe the private data you want to secure, it is best to have it outside the project or add it to .ignore file")
    .option('-p, --path <path>', "path of the folder that will containe the obfuscated files")
    .option('-c, --counter <counter>', "word counter, this will decide how many files will be created to scatter the data between more then one file. default 2 files")
    .option('-t, --type <type>', "the file type that will be created, default is js")
    .option('-tm, --includeTypeInImport', "This will include the file type in import so instead of './xx' will be './xx.js'")
    .option('-o, --overwrite', "Overwrite the content in the folder, this will remove everything in the folder and add new files")
    .action(Obfuscate);
    program.parse();
