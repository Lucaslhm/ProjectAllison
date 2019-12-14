#!/usr/bin/env node

const sys = require('util');
const spawn = require('child_process').spawn;
//const dummy = spawn('python3',['../AllisonBrain/src/generateText.py','124M', "../AllisonBrain/src/models", '../AllisonBrain/src/checkpoint/run1/']);
//const dummy = spawn('python3',['../AllisonBrain/src/initializeModel.py', '124M', 'allison.txt', '1']);

dummy.stdout.pipe(process.stdout);
dummy.stderr.pipe(process.stderr);