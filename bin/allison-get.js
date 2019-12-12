#!/usr/bin/env node

const config = require('../config.js');
const pkg = require('../package.json');
const TwitterClient = require('../util/TwitterClient.js');
const commander = require('commander');

TwitterClient.get();