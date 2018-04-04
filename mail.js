let nodeMailer = require('nodemailer');
class Mailer {

  setTransporter (mail, password) {
    this.sender = mail;
    this.transporter = nodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: mail,
        pass: password
      }
    });
  }

  setMailOptions (recipient, subject, text, attachments) {
    let mailOptions = {
      from: this.sender,
      to: recipient,
      subject: subject,
      html: text
    };

    if (typeof attachments !== 'undefined') {
      mailOptions.attachments = [
        {
          path: attachments.path
        }
      ]
    }

    this.mailOptions = mailOptions;
  }

  sendmail (callback) {
    this.transporter.sendMail(this.mailOptions, function (error, info) {
      let status;
      if (error) {
        status = error;
      }
      else {
        status = info;
      }
      if(typeof callback !== 'undefined'){
        callback(status);
      }
    })
  }
}
let mailer = new Mailer;
module.exports = mailer;