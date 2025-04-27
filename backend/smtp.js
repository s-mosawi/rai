import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "hello@responsble.ai",
    pass: "Myrealnamemurtaza1!", 
  }
});

export default async function smtp(subject, to, html) {
  const options = {
    subject,
    from: "Responsible AI <hello@responsble.ai>",
    to,
    html
  };
  try {
    await transporter.sendMail(options);
    return true;
  } catch (err) {
    throw err;
  }
}
