require('dotenv').config();
const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

module.exports = class Email {
    static sendEmail (data, cb) {
        mg.messages().send(data,(err, body) => {
            if(err) console.log(err);
            return cb(body);
        });
    }
}

