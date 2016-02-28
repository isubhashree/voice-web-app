var express = require('express');
var app = express();
var accountSid = 'ACc9d9237cca179ff6be14a4347507f86e'; 
var authToken = 'f91dc02a675a9f0468cfde682f53d2e3'; 
var client = require('twilio')(accountSid, authToken);

app.use(express.static(__dirname + '/public'));

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

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})