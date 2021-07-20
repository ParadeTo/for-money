const webpack = require('webpack');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
const webpackConfig = require('../config/webpack/webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const paths = require('../config/paths');
const { logMessage, compilerPromise } = require('./utils');

const watchOptions = {};
let server = express();
const start = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);
  const multiCompiler = webpack(webpackConfig);
  const [clientconfig, serverConfig] = webpackConfig;
  clientconfig.entry.bundle = [
    ...clientconfig.entry.bundle,
    'webpack-hot-middleware/client',
  ];
  const clientCompiler = multiCompiler.compilers.find(
    compiler => compiler.name === 'client'
  );
  const serverCompiler = multiCompiler.compilers.find(
    compiler => compiler.name === 'server'
  );
  const clientCompilePromise = compilerPromise(
    'client',
    clientCompiler,
    clientconfig
  );
  const serverCompilePromise = compilerPromise(
    'server',
    serverCompiler,
    serverConfig
  );

  server.use('/static', express.static(paths.clientBuild));
  server.use(
    webpackDevMiddleware(clientCompiler, {
      logLevel: 'silent',
      publicPath: paths.publicPath,
      watchOptions: watchOptions,
      stats: clientconfig.stats,
      writeToDisk: true,
    })
  );
  server.use(require('webpack-hot-middleware')(clientCompiler));
  server.listen(3001);
  // let serverApp;
  // server.use('*', (req, res) => {
  //   serverApp(req, res)
  // })
  serverCompiler.watch(watchOptions, (error, stats) => {
    // if(!error && !stats.hasErrors()) {
    //   console.log(stats.toString(serverConfig.stats))
    //   return;
    // }
    if (error) {
      logMessage(error, 'error');
    }
    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      logMessage(errors[0], 'error');
      logMessage(errors[1], 'error');
      logMessage(errors[2], 'error');
    }
  });
  try {
    await clientCompilePromise;
    await serverCompilePromise;
  } catch (error) {
    logMessage(error, 'error');
  }
  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
    exec: 'node',
    // nodeArgs: ["inspect"],
    delay: 1000,
  });

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error');
    process.exit(1);
  });
};

start();
