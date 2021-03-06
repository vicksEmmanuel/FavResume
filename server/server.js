//dependency required
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
var app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const showdown = require('showdown');
const Resume = require('../controllers/Document.js');
const Template = require('../controllers/Template.js');
const Email = require('../controllers/Email.js');
var cors = require('cors')

var fs = require('fs');

//setting view engine 
app.set('view engine', 'hbs')


// middleware
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"))



//Routes



app.get('/', (req, res) => {
  res.render('app')
});


app.get('/home', (req, res) => {
  res.render('index')
});

app.get('/learn', (req, res) => {
  res.render('learn')
});


app.post('/generate', (req, res) => {
  var data = req.body

  //Reads the Base Template from the Views Folder
  var template = hbs.compile(fs.readFileSync(Template.choosePathToEngine(data), 'utf8'));

  //Proccessing the base template with the content
  var html = template({content: Template.chooseTemplate(data)})

  var filename = `${data.firstname}${data.lastname}${new Date().toLocaleDateString()}`;
  //create PDF from the above generated html
  Resume.checkTypeOfDocumentAndCreate(
    data.type,
    html,
    filename,
    () => {
      return res.json({filename:filename+`.${data.type}`})
    },
    (err) => {
      return console.log('Error');
    }
  );

});

app.post('/generate-and-send', (req, res) => {
  var data = req.body
  //Reads the Base Template from the Views Folder
  var template = hbs.compile(fs.readFileSync(Template.choosePathToEngine(data), 'utf8'));

  //Proccessing the base template with the content
  var html = template({content: Template.chooseTemplate(data)})

  var filename = `${data.firstname}${data.lastname}${new Date().toLocaleDateString()}`;
  //create PDF from the above generated html
  Resume.checkTypeOfDocumentAndCreate(
    data.type,
    html,
    filename,
    () => {
      let defaultEmail = process.env.EMAIL;
      let emailData = {
        from: defaultEmail,//data.contact? data.contact.email? data.contact.email:defaultEmail : defaultEmail,
        to: data.who? data.who : '',
        subject: data.subject? data.subject: '',
        text: data.coverLt? data.coverLt: '',
        attachment: request(`https://vicks-favresume-hackathon.herokuapp.com/${filename+`.${data.type}`}`)
      }
      Email.sendEmail(emailData, 
        (resp) => {
          return res.json({success: 'done', filename:filename+`.${data.type}`});
        }
      );
    },
    (err) => {
      return console.log('Error');
    }
  );
})

//listen to voice of God
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
};
