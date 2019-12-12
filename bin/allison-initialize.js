#!/usr/bin/env node

const config = require('../config.js');
const pkg = require('../package.json');
const commander = require('commander');
const prompt = require('prompt');
const fs = require('fs');

let authPath = '../auth.json';

console.log('You have called the Initalize method');

const properties = [
  {
    name: 'consumer_key'
  },
  {
    name: 'consumer_secret',
    hidden: true
  },
  {
    name: 'access_token_key'
  },
  {
    name: 'access_token_secret',
    hidden: true
  }
];

const override = [
  {
    name: 'Override',
    description: 'Do you want to Override the current config? [(Y)es/(N)o]'
  }
]

prompt.start();

prompt.get(properties, function (err, result){
  if (err) { return onErr(err); }
    console.log('Command-line input received:');
    if(fs.existsSync(authPath)){
      console.log("This file exists");
        prompt.get(override, function (err, response){
          if (err) { return onErr(err); }

          if (response.Override.toUpperCase() == 'Y' || response.Override.toUpperCase() == 'YES') {
            fs.unlinkSync(authPath);
            fs.writeFile(authPath, JSON.stringify({
              consumer_key: result.consumer_key,
              consumer_secret: result.consumer_secret,
              access_token_key: result.access_token_key,
              access_token_secret: result.access_token_secret
            }), function (err) {if (err) { return reject(err); }});
            console.log("Config overriden");
          } else if ((response.Override.toUpperCase() == 'N' || response.Override.toUpperCase() == 'NO')) {
            console.log('Update refused');
          } else{
            console.log('Invalid input');
          }

        });


    } else {
      console.log("This file does not exists");
      fs.writeFile(authPath, JSON.stringify({
        consumer_key: result.consumer_key,
        consumer_secret: result.consumer_secret,
        access_token_key: result.access_token_key,
        access_token_secret: result.access_token_secret
      }), function (err) {if (err) { return reject(err); }});
    }
});

function onErr(err) {
    console.log(err);
    return 1;
}
