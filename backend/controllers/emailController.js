const nodemailer = require("nodemailer");

exports.sendEmail = (fullname, email, phone) => {
  const html = `
  <h2>You have a new contact</h2>
  <ul>
    <li>Fullname: ${fullname}</li>
    <li>Email: ${email}</li>
    <li>Phone: ${phone}</li>
  </ul>
  `;

  async function main() {
    let transporter = nodemailer.createTransport({
      host: "mail.su1trade.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sherif@su1trade.com", // generated ethereal user
        pass: "^Y&yw3E4db0S", // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"SU1trade New Signup 👻" <sherif@su1trade.com>', // sender address
      to: "sherif.oghie@gmail.com, kmbagwu12@gmail.com", // list of receivers
      subject: "SU1trade New User Signed Up", // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};
