let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let app = express();
let Filesystem = require('fs');
let mailClass = require('./mail');

app.use(express.static('public'));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.urlencoded());
app.use(session({secret: '7D97673C31BE313EC893ABD3C43A1'}));


app.get('/', function(req, res){
  Filesystem.readFile('public/markup/index.html', 'utf8', function (err, data) {
    let markup = String(data);
    res.send(markup);
  });
});

app.get('/mail', function(req, res){
  Filesystem.readFile('public/markup/mail.html', 'utf8', function (err, data) {
    let markup = String(data);

    res.send(markup);
  });
});

app.post('/send', function(req, res){
  let formData = req.body;
  let recipient;
  let about;
  let content;
  if(formData.hasOwnProperty('recipient') && formData.hasOwnProperty('about') && formData.hasOwnProperty('content')){
    recipient = formData.recipient, about = formData.about,  content = formData.content;
  }
  mailClass.setMailOptions(recipient, about, content);
  mailClass.sendmail(function(response){
  let answer = {messageIsSent: 0};
    if(response.hasOwnProperty('accepted')){
      answer.recipients = response.accepted;
      answer.messageIsSent = 1;
    } else if (response.hasOwnProperty('responseCode')){
      answer.error = response.responseCode;
    } else {
      answer.error = "Ein unerwarteter Fehler ist aufgetreten."
    }
    res.send(answer);
    console.log(response);
  });
});

app.post('/auth', function(req, res){
  let formData = req.body;
  let success = false;
  let mail;
  let pw;
  if(formData.hasOwnProperty('email') && formData.hasOwnProperty('password')){
    mail = formData.email, pw = formData.password;
  }
  if(mail !== '' && pw !== ''){
    success = '/mail';
    mailClass.setTransporter(mail, pw);
    // mailClass.setMailOptions('michiboetschi@gmail.com', 'michael.boetschi@viaduct.ch', 'Test', 'this is a test');
    // mailClass.sendmail();
    //console.log(util.inspect(transporter));

    // req.session.mailObject = JSON.stringify(transporter);
    // req.redirect('/mail');
  }
  res.send(success);
});


app.listen(1312);