import meow from "meow";
import Listr from "listr";
import path from "path";
import execa from "execa";
import chalk from "chalk";

const cli = meow(
  `
  Usage
   $ phoenix-cli <source>

  Options
   --rainbow, -r  Include a rainbow

  Examples
   $ foo unicorns --rainbow
   🌈 unicorns 🌈
`,
  {
    flags: {
      rainbow: {
        type: "boolean",
        alias: "r",
      },
    },
  }
);

const source = cli.input[0];
const PWD = process.cwd();
const DIR = path.resolve(PWD, source);

(() => {
  const tasks = new Listr([
    {
      title: `Create Project ${DIR}`,
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
      task: () => {
        // execa.commandSync(`cd ${DIR} && rm -rf .git && yarn`);
        execa("node", [`cd ${DIR}`, "rm -rf .git", "yarn"]);
      },
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
