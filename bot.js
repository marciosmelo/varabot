// Dependencies =========================
var twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var params = {
    q: 'varacast',  // REQUIRED
    result_type: 'mixed',
    count: 20
}

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    Twitter.get('search/tweets', params, function(err, data, response) {
  		if (!err) {
 			var retweet = ranDom(data.statuses);
  			 Twitter.post('statuses/retweet/:id', {
                 id: retweet.id_str
             },function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                 if (err) {
                    console.log('Something went wrong while RETWEETING: ' + err);
                }
            });
  		}else{
  			console.log(err, "Error at search/tweets function");
  		}
	});
   
}

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
                            console.log('CANNOT BE FAVORITE... Error: ' + err);
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

 Twitter.stream('statuses/filter', {track: 'podcast'}, function(stream) {
    stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);

    //build our reply object
    var statusObj = {status: "Oinc oinc @" + tweet.user.screen_name }

    //call the post function to tweet something
    Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

  // grab & retweet as soon as program is running...
  retweet();
  // grab & 'favorite' as soon as program is running...
  favoriteTweet();
  // retweet in every 50 minutes
  setInterval(retweet, 3600000);
  // 'favorite' a tweet in every 30 minutes
  setInterval(favoriteTweet, 1800000);
  // function to generate a random tweet tweet
  function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
  };

 // for more parametes, see: https://dev.twitter.com/rest/reference
