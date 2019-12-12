#!/usr/bin/env node

var config = require('../config.js');
var pkg = require('../package.json');
var commander = require('commander');


commander
  .version(pkg.version)
  .description('Allison AI Commandline tool')
  .command('initialize', 'Initialize your local instance of Allison').alias('init')
  .command('post', 'Allison posts to twitter')
  .command('test', 'Test that Allison is initialized correctly')
  .command('get', 'returns recent tweets directed at Allison')
  .command('start', 'starts Allison\'s services.')
  .parse(process.argv);

  if (!commander.runningCommand) {
    console.log('\nInvalid Allison command.\n');
    commander.outputHelp();
    process.exit(1);
  }