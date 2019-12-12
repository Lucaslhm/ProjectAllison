#!/usr/bin/env node

const Twitter = require('twitter');
const auth = require('../auth.json');


let client = new Twitter({
    consumer_key: auth.consumer_key,
    consumer_secret: auth.consumer_secret,
    access_token_key: auth.access_token_key,
    access_token_secret: auth.access_token_secret
});

function post(content) {


    if (content.length <= 280) {
        client.post('statuses/update', {status: content}, function (error, tweet, response) {
            console.log('Allison tweeted: ' + content);
            if (error) throw JSON.stringify(error);
        });
    } else {
        client.post('statuses/update', {status: content.substring(0, 277) + '...'}, function (error, tweet, response) {
            console.log('Allison tweeted: ' + content);
            if (error) throw JSON.stringify(error);
        });
    }
}

function get(){
    let params = {screen_name: 'project_allison', count: 5, include_rts: false, exclude_replies: false, tweet_mode: 'extended'};
    client.get('statuses/mentions_timeline', params, function (error, tweets, response){
        if (error) throw JSON.stringify(error);
        console.log(tweets);
    });
}

module.exports = {
    post,
    get
};