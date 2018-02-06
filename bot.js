// Dependencies =========================
var twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '#podcast',  // REQUIRED
        result_type: 'recent',
        count: 1
    }

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
// retweet in every 5 minutes
setInterval(retweet, 300000);



