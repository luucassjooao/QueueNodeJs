import { createTransport } from 'nodemailer';

export async function sendMail(
  to: string,
  subject: string,
  body: string
) {
  const transport = createTransport({
    host: `${process.env.MAIL_HOST}`,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: `${process.env.MAIL_USER}`,
      pass: `${process.env.MAIL_PASSWORD}`
    },
  });

  await transport.sendMail({
    from: 'testmybro@yeahhhBuddy.com',
    to,
    subject,
    text: body,
  });
}
