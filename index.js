var express = require('express');
var app = express();
var dotenv =require('dotenv').config({path:'myenv-var.env'}); //{silent: true}
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/Public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "WebVoiceApp.html" );
})

app.get('/sendSMS', function (req, res) {
   // Prepare output in JSON format
   response = {
       to_phone_number:req.query.to_phone_number,
       from_phone_number:req.query.from_phone_number,
       msg_content:req.query.msg_content
   };
   console.log(response);
   res.end(JSON.stringify(response));

  client.sendMessage({ 
    to: req.query.to_phone_number, 
    from: req.query.from_phone_number, 
    body: req.query.msg_content, 
  }, function(error, message) { 
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.'+"-"+error.message);
    }
  });
})

app.listen(app.get('port'), function () {
  console.log("Example app listening at", app.get('port'));
})