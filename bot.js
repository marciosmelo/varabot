// Dependencies =========================
var twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var params = {
    q: 'varacast',  // REQUIRED
    result_type: 'mixed',
    count: 20
}

// we will randomly pick one of these items in this array
var arrResponses = [
    "Calma porcouvinte, Vara é apenas o coletivo de porcos.",
    "Oinc, oinc!",
    "Como já diria @Wildpoxx: F***** o Brasil! METAAAAALLLL!!!",
    "Sem dúvidas.",
    "Meu porcosentido diz que não.",
    "Ouça nosso último podcast e vais entender melhor.",
    "Na POCILGA.com.br temos o melhor time de porcolunistas.",
    "Respire, concentre-se, e tente outra vez.",
    "Sei não.",
    "Gelo fino, gelo fino....",
    "Porco-aranha, porco-aranha.....",
    "Dúvido bastante.",
    "Sim, claro.",
    "SOOOOOOOOOOBE WAR PIGS!!!.",
    "TANRAAAN.... TAN TAN TAAAAAN TANRAAAANNNN!!!",
    "Diga oláaaaa...",
    "Pergunte-me outra vez, mais tarde.",
    "Minha resposta pode ser não.",
    "Será?",
    "Não conte com isto."
  ]

//The @Varacast timeline
var stream = Twitter.stream('statuses/filter', {track: 'varacast'}); 

stream.on('tweet', function(tweet){
    console.log(tweet.text);
  
    var username = tweet.user.screen_name;
    if (username != 'varacast') {
        var reply = "Olá @" + username + ", " + ranDom(arrResponses);
        //call the post function to tweet something
        Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){
    
            //if we get an error print it out
            if(error){
            console.log(error);
            }
    
            //print the text of the tweet we sent out
            console.log(tweetReply.text);
        });
    }
});

stream.on('error', function(error) {
    //print out the error
    console.log(error);
});

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = () => {
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
var favoriteTweet = () => {
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


  // grab & retweet as soon as program is running...
  retweet();
  // grab & 'favorite' as soon as program is running...
  favoriteTweet();
  // retweet in every 60 minutes
  setInterval(retweet, 3600000);
  // 'favorite' a tweet in every 30 minutes
  setInterval(favoriteTweet, 1800000);
  // function to generate a random tweet tweet
  function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
  };

 // for more parametes, see: https://dev.twitter.com/rest/reference

