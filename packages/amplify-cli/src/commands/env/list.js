const chalk = require('chalk');

module.exports = {
  name: 'list',
  run: async (context) => {
    const { envName } = context.amplify.getEnvInfo();

    if (context.parameters.options.details) {
      const allEnvs = context.amplify.getEnvDetails();

      Object.keys(allEnvs).forEach((env) => {
        context.print.info('');
        if (envName === env) {
          context.print.info(chalk.red(`*${env}*`));
        } else {
          context.print.info(chalk.yellow(env));
        }
        context.print.info('--------------');

        Object.keys(allEnvs[env]).forEach((provider) => {
          context.print.info(`Provider: ${provider}`);

          Object.keys(allEnvs[env][provider]).forEach((providerAttr) => {
            context.print.info(`${providerAttr}: ${allEnvs[env][provider][providerAttr]}`);
          });

          context.print.info('--------------');
          context.print.info('');
        });

        context.print.info('');
      });
    } else {
      const allEnvs = context.amplify.getAllEnvs();
      const { table } = context.print;
      const tableOptions = [['Environments']];
      for (let i = 0; i < allEnvs.length; i += 1) {
        if (allEnvs[i] === envName) {
          tableOptions.push([`*${allEnvs[i]}`]);
        } else {
          tableOptions.push([allEnvs[i]]);
        }
      }
      context.print.info('');
      table(
        tableOptions,
        { format: 'markdown' },
      );
      context.print.info('');
    }
  },
};
