var twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var params = {
    q: 'varacast',
    result_type: 'recent',
    count: 30
}

// BOT Search for Fave and RT
var tweetBot = () => {
    // find the tweet
    Twitter.get('search/tweets', params, function (err, data, response) {
        if (!err) {
            // find tweets
            var tweets = data.statuses;
            var randomTweet = ranDom(tweets);
            var user;
            if (typeof randomTweet != 'undefined') {
                user = randomTweet.user.screen_name;
                console.log('user -> ' + user);
                try {
                    if (user != 'varacast') {
                        faveTweet(randomTweet);
                        retweet(randomTweet);
                    }
                } catch (ex) {
                    console.log(ex);
                }
            } else {
                console.log(err, "Error at favorites/tweets function");
            }
        }
    });
}

function faveTweet(tweet) {
    Twitter.post('favorites/create', { id: tweet.id_str }, function (err, response) {
        if (err) {
            console.log('Tweet doesnt favorited: ' + err);
        }
        else {
            console.log('Tweet favorited!!');
        }
    });
}

function retweet(tweet) {
    Twitter.post('statuses/retweet/:id', {
        id: tweet.id_str
    }, function (err, response) {
        if (!err) {
            console.log('Retweeted!!!');
        } else {
            console.log('Something went wrong while RETWEETING: ' + err);
        }
    });
}

function ranDom(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
};

tweetBot();
setInterval(tweetBot, 3600000);

