var twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var params = {
    q: 'varacast',  // REQUIRED
    result_type: 'recent',
    count: 10
}

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
    
	    if(error){
            	console.log(error);
            }else{    
   	        console.log(tweetReply.text);
	    }
        });
    }
});

stream.on('error', function(error) {
    console.log(error);
});

// RETWEET BOT ==========================
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
var favoriteTweet = () => {
    // find the tweet
    Twitter.get('search/tweets', params, function(err,data,response){
        if (!err) {
        // find tweets
            var tweet = data.statuses;
            var randomTweet = ranDom(tweet);   // pick a random tweet
                // if random tweet exists
                if(typeof randomTweet != 'undefined'){
                    Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
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

  function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
  };

  // grab and 'RT' and 'favorite' as soon as program is running...
  retweet();
  favoriteTweet();
  //Call the RT and Fave after intervals (miliseconds)
  setInterval(retweet, 3600000);
  setInterval(favoriteTweet, 1800000);
  
 
 // for more parametes, see: https://dev.twitter.com/rest/reference

