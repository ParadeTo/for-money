const chalk = require('chalk');

const logMessage = (message, level = 'info') => {
  const color =
    level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

const compilerPromise = (name, compiler, config) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap('compile', () => {
      console.info(`Compiling '${name}'... plz wait...`);
    });
    compiler.hooks.done.tap('done', stats => {
      if (!stats.hasErrors()) {
        console.log(stats.toString(config.stats));
        return resolve();
      }
      return reject('Compilation failed');
    });
  });
};

module.exports = {
  logMessage,
  compilerPromise,
};
