import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const user = process.env.MAIL_USER;
const secret = process.env.MAIL_SECRET;
const host = process.env.MAIL_HOST;
const mailAddress = process.env.MAIL_ADDRESS;

const transporter = createTransport({
  host,
  port: 587,
  auth: {
    user,
    pass: secret,
  },
});

type MailParams = {
  subject: string;
  html: string;
};

export const sendMail = async (params: MailParams) => {
  const message = {
    from: user,
    to: mailAddress,
    ...params,
  };

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(message, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
};
