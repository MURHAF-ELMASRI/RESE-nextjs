import process from "process";

import nodemailer from "nodemailer";
import env from "../../config/env";

console.log(env.user, env.pass);
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "resefootball@gmail.com",
    pass: "reseFootball@firat",
  },
});

export default transport;

function sendConfirmationEmail(
  fullName: string,
  email: string,
  confirmationCode: string,
) {
  return transport.sendMail({
    from: process.env.mail,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${fullName}</h2>
          <p>Thank you for subscribing. your confirmation code is</p>
           <h3>${confirmationCode}</h3>
          </div>`,
  });
}

export default sendConfirmationEmail;
