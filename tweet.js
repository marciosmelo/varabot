var TwitterPackage = require('twitter');

// importing my secret.json file
var secret = require("./config");


console.log('teste');
//make a new Twitter object
var Twitter = new TwitterPackage(secret);

// we will randomly pick one of these items in this array
var arrOfMagicSayings = [
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
    "TARAAAN.... TAN TAN TAAAAAN TANRAAAANNNN!!!",
    "Diga olá...",
    "Pergunte-me outra vez, mais tarde.",
    "Minha resposta pode ser não.",
    "Será?",
    "Não conte com isto."
  ]

  // Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: 'varacast'}, function(stream) {

    // ... when we get tweet data...
    stream.on('data', function(tweet) {
  
      // print out the text of the tweet that came in
      console.log(tweet.text);
  
      // calculate the random index (Math.random returns a double between 0 and 1)
      var randomIndex = Math.round(Math.random() * arrOfMagicSayings.length);
  
      //build our reply string grabbing the string in that randomIndex we've calculated
      var reply = "Hi @" + tweet.user.screen_name + ", " + arrOfMagicSayings[randomIndex];
  
      //call the post function to tweet something
      Twitter.post('statuses/update', {status: reply},  function(error, tweetReply, response){
  
        //if we get an error print it out
        if(error){
          console.log(error);
        }
  
        //print the text of the tweet we sent out
        console.log(tweetReply.text);
      });
    });
  
    // ... when we get an error...
    stream.on('error', function(error) {
      //print out the error
      console.log(error);
    });
  });
  