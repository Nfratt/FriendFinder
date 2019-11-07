//require//
var express = require("express");
var path = require("path");

//Express App Setup
var app = express();
var PORT = process.env.PORT || 3000;

//Express app 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data
var friendlist = [
  {
    name: 'Nick',
    photo: 'https://media.licdn.com/dms/image/C4D03AQEU1Qvwj1Nhmg/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=NlH_IiDcJ4ggBZixfDco56tfMLb3c-DT4UuE-Mpk6OU',
    scores: [
      '5',
      '2',
      '5',
      '5',
      '4',
      '1',
      '4',
      '4',
      '1',
      '1'
    ]
  }
]


//htmlRoutes
// homepage
app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname, '/friendfinder/public/home.html'));
});

//Survey 
app.get('/survey', function (req, res) {

  res.sendFile(path.join(__dirname, '/friendfinder/public/survey.html'));
});

//apis 
//Display all friendlist
app.get('/api/friendlist', function (req, res) {
  return res.json(friendlist);
});

// new friendlist
app.post("/api/friendlist", function (req, res) {
  var newFriend = req.body;
  console.log(newFriend);
  friendlist.push(newFriend);

  //Compare scores
  let match;
  let maxscore = 99;
// had to do a for loop inside a for loop(had to look this up)
  for (var i = 0; i < friendlist.length - 1; i++) {
    var score = 0;
    for (var j = 0; j < 10; j++) {
      var partialsum = Math.abs(friendlist[i].scores[j] - newFriend.scores[j]);
      score += partialsum;
    }
    if (score < maxscore) {
      maxscore = score;
      match = i;
    }
  }
  res.json(friendlist[match]);
});


//Start the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});