#!/usr/bin/env node

const config = require('../config.js');
const pkg = require('../package.json');
const TwitterClient = require('../util/TwitterClient.js');
const commander = require('commander');

var content = "";


commander
    .version(pkg.version)
    .description('Allison posts to twitter')
    .arguments('<post>')
    .action(function (post) {
        content = post;
    })
    .parse(process.argv);


console.log("Allison post method");

if (content !== ""){
    TwitterClient.post(content);
} else {
    console.log("No post passed")
}
