// load the things we need
var PORT = process.env.PORT || 8080;
var express = require('express');
const path = require('path');
var app = express();
app.use (express.static("public"));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/file.html')));
app.get('/getRate', function(req, res) {
    const weight = req.query.weight; 
    const mail_type =req.query.mail_type; 
    const postage = calculateRate(mail_type, weight); 
    res.render('pages/result', {postage:postage, weight:weight, mail_type:mail_type});
    
});
app.listen(PORT);
console.log('8080 is the magic port');


function calculateRate (mail_type, weight){
    let retail_parcels = [
        { weight: '1', zone1: "$4"},
        { weight: '2', zone1: "4"},
        { weight: '3', zone1: "4"},
        { weight: '4', zone1: "4"},
        { weight: '5', zone1: "4,8"},
        { weight: '6', zone1: "4,8"},
        { weight: '7', zone1: "4,8"},
        { weight: '8', zone1: "4,8"},
        { weight: '9', zone1: "5,5"},
        { weight: '10', zone1: "5,5"},
        { weight: '11', zone1: "5,5"},
        { weight: '12', zone1: "5,5"},
        { weight: '13', zone1: "6,25"}
    ];
    let letter_stamped = [
        { weight: '1', price: "$0,55"},
        { weight: '2', price: "0,75"},
        { weight: '3', price: "0,95"},
        { weight: '3,5', price: "1,15"}
    ];
    let letter_metered = [
        { weight: '1', price: "0,51"},
        { weight: '2', price: "0,71"},
        { weight: '3', price: "0,91"},
        { weight: '3,5', price: "1,11"}
    ];
    let letter_flats = [
        { weight: '1', price: "1"},
        { weight: '2', price: "1,2"},
        { weight: '3', price: "1,4"},
        { weight: '4', price: "1,6"},
        { weight: '5', price: "1,8"},
        { weight: '6', price: "2"},
        { weight: '7', price: "2,2"},
        { weight: '8', price: "2,4"},
        { weight: '9', price: "2,6"},
        { weight: '10', price: "2,8"},
        { weight: '11', price: "3,0"},
        { weight: '12', price: "3,2"},
        { weight: '13', price: "3,4"}
    ];
    let postage = "Not found. For weights over 3.5 ounces, see Large Envelopes prices.";
    switch(mail_type){
      case 'stamped':
            letter_stamped.forEach(function(letter){
                if (letter.weight === weight){
                    postage = letter.price;
                }
            });
            break;
      case 'metered':
            letter_metered.forEach(function(letter){
            if (letter.weight === weight){
                postage = letter.price;
                }
            });
            break;
      case 'flats':
            letter_flats.forEach(function(letter){
            if (letter.weight === weight){
                postage = letter.price;
                }
            });
            break;
      case 'package':
            retail_parcels.forEach(function(letter){
            if (letter.weight === weight){
                postage = letter.zone1;
                }
            });
            break;
      default:
            postage = "The operation is not supported";
            break;
  }
  return postage;
}