#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const listr_1 = __importDefault(require("listr"));
const path_1 = __importDefault(require("path"));
const execa_1 = __importDefault(require("execa"));
const chalk_1 = __importDefault(require("chalk"));
const cli = meow_1.default({
    help: `
  Usage
   $ phoenix-cli <source>

  Options
   --rainbow, -r  Include a rainbow

  Examples
   $ phoenix-cli --rainbow
   🌈 phoenix-cli 🌈
  `,
    description: false,
});
const source = cli.input[0];
const PWD = process.cwd();
const DIR = path_1.default.resolve(PWD, source);
(() => {
    const tasks = new listr_1.default([
        {
            title: `Create Project ${DIR}`,
            task: () => {
                return execa_1.default.commandSync(`mkdir ${DIR}`);
            },
        },
        {
            title: "Git Clone",
            task: () => {
                return execa_1.default.commandSync(`git clone https://github.com/Phoenix-org/phoenix-v ${DIR}`);
            },
        },
        {
            title: "Install Modules",
            task: () => {
                // execa.commandSync(`cd ${DIR} && rm -rf .git && yarn`);
                execa_1.default("node", [`cd ${DIR}`, "rm -rf .git", "yarn"]);
            },
        },
    ]);
    tasks
        .run()
        .then(() => {
        console.log(chalk_1.default.blue(`
    Thanks for use phoenix-cli ❤️
          `));
        console.log(chalk_1.default.green(`
    We already ran yarn for you, so your next steps are:
    $ cd ${source}
    $ yarn dev
    To start a local server for development.
    $ yarn build
    To build for production.
    $ yarn start
    To run the server in production.
          `));
    })
        .catch((err) => {
        chalk_1.default.red(err);
    });
})();
//# sourceMappingURL=index.js.map