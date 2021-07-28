const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.fullname.split(" ")[0];
    this.url = url;
    this.from = `SU1trade [SUPPORT] <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_POST,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.MEMAIL_HOST,
      port: process.env.MEMAIL_POST,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MEMAIL_USERNAME, // generated ethereal user
        pass: process.env.MEMAIL_PASSWORD, // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  }

  // Sends email
  async send(template, subject) {
    // 1. Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3. Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Comfirm Your Registration! ");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Reset your SU1trade password");
  }
};
