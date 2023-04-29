import nodemailer from 'nodemailer';
import process from 'process';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

function sendConfirmationEmail(
  fullName: string,
  email: string,
  confirmationCode: string
) {  
  return transport.sendMail({
    to: email,
    subject: 'Please confirm your account',
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${fullName}</h2>
          <p>Thank you for subscribing. your confirmation code is</p>
           <h3>${confirmationCode}</h3>
          </div>`,
  });
}

export default sendConfirmationEmail;
