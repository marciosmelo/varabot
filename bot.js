var twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

var params = {
    q: 'varacast',  
    result_type: 'recent',
    count: 20
}

var arrResponses = [
    "Calma porcouvinte, vara é apenas o coletivo de porcos.",
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
    "Duvido bastante.",
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
        var reply = "Olá @" + username + "... " + ranDom(arrResponses);
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



// BOT Search for Fave and RT
var tweetBot = () => {
    // find the tweet
    Twitter.get('search/tweets', params, function(err,data,response){
        if (!err) {
            // find tweets
            var tweets = data.statuses;
            var randomTweet = ranDom(tweets);   
            
            if(typeof randomTweet != 'undefined' ){
                var user = randomTweet.user.screen_name;
                console.log('user -> ' + user;
                try {
                    faveTweet(randomTweet);
                    retweet(randomTweet);
                    //replyTweetWithRandonAnswer(randomTweet);
                }catch(ex){
                    console.log(ex);
                }
                
            }else{
                console.log(err, "Error at favorites/tweets function");
            }
        }
    });
}
 
function faveTweet(tweet){
    Twitter.post('favorites/create', {id: tweet.id_str}, function(err, response){
        if(err){
            console.log('Tweet doesnt favorited: ' + err);
        }
        else{
            console.log('Tweet favorited!!');
        }
    });
}

function retweet(tweet){
    Twitter.post('statuses/retweet/:id', {
        id: tweet.id_str
    },function(err, response) {
        if (response) {
            console.log('Retweeted!!!');
        }
        if (err) {
            console.log('Something went wrong while RETWEETING: ' + err);
        }
    });
}

function replyTweetWithRandonAnswer(tweet){
    var username = tweet.user.screen_name;
    console.log('username: ' + username);
    if (username != 'varacast') {
        var reply = "Olá @" + username + ", " + ranDom(arrResponses);
        Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){
            if(error){
                console.log(error);
            }else{    
                console.log(tweetReply.text);
            }
        });
    }
}

function ranDom (arr) {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
};

//grab and 'RT' and 'favorite' as soon as program is running...
tweetBot();
//Call the RT and Fave after intervals (1 hora)
setInterval(tweetBot, 3600000);

