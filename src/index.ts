#!/usr/bin/env node

import meow from "meow";
import Listr from "listr";
import path from "path";
import execa from "execa";
import chalk from "chalk";

const cli = meow({
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
const DIR = path.resolve(PWD, source);

(() => {
  const tasks = new Listr([
    {
      title: `Create Project ${source}`,
      task: () => {
        return execa.commandSync(`mkdir ${DIR}`);
      },
    },
    {
      title: "Git Clone",
      task: () => {
        return execa.commandSync(
          `git clone https://github.com/Phoenix-org/phoenix-v ${DIR}`
        );
      },
    },
    {
      title: "Install Modules",
      task: async () => {
        await execa("sh", ["-c", `cd ${DIR} && rm -rf .git && yarn`]);
        return true;
      },
    },
    {
      title: "Done",
      task: () => {},
    },
  ]);

  tasks
    .run()
    .then(() => {
      console.log(
        chalk.blue(`
    Thanks for use phoenix-cli ❤️
          `)
      );
      console.log(
        chalk.green(`
    We already ran yarn for you, so your next steps are:
    $ cd ${source}
    $ yarn dev
    To start a local server for development.
    $ yarn build
    To build for production.
    $ yarn start
    To run the server in production.
          `)
      );
    })
    .catch((err: any) => {
      chalk.red(err);
    });
})();
