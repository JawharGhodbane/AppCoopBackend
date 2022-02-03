const nodemailer = require('nodemailer');
const config = require('../config/mailerconfig');


const transport = nodemailer.createTransport({
  service: "Gmail",
    auth: {
    user: config.user,
    pass: config.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});



module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) {
            reject(err);
            console.log("noo");
        }
        resolve(info);
      });
    });
  }
}