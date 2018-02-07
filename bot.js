// Dependencies =========================
var twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var params = {
    q: 'varacast',  // REQUIRED
    result_type: 'recent'
}

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    Twitter.get('search/tweets', params, function(err, data, response) {
  		if (!err) {
 			var retweetId = data.statuses[0].id_str;
  			 Twitter.post('statuses/retweet/:id', {
                 id: retweetId
             },function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                 if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
  		}else{
  			console.log(err, "Error at search/tweets function");
  		}
	});
   
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
    // find the tweet
    Twitter.get('search/tweets', params, function(err,data,response){
        if (!err) {
        // find tweets
            var tweet = data.statuses;
            var randomTweet = ranDom(tweet);   // pick a random tweet
                // if random tweet exists
                if(typeof randomTweet != 'undefined'){
                    // Tell TWITTER to 'favorite'
                    Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
                        // if there was an error while 'favorite'
                        if(err){
                            console.log('CANNOT BE FAVORITE... Error');
                        }
                        else{
                            console.log('FAVORITED... Success!!!');
                        }
                    });
                }else{
                    console.log(err, "Error at favorites/tweets function");
                }
       }
    });
  }
  // grab & 'favorite' as soon as program is running...
  favoriteTweet();
  // 'favorite' a tweet in every 60 minutes
  setInterval(favoriteTweet, 3600000);
  
  // function to generate a random tweet tweet
  function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
  };

 // for more parametes, see: https://dev.twitter.com/rest/reference