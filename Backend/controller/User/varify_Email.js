const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      debug: false,
      logger: true
    });

    await transporter.sendMail({
      from: 'noreply@verifyHospital.com',
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
    return 1;
  } catch (error) {
    
    console.log("email not sent");
    console.log(error);
    return 0;
  }
};

module.exports = sendEmail;