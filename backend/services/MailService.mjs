import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Handlebars setup
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: path.resolve("./views/emails"),
      defaultLayout: false
    },
    viewPath: path.resolve("./views/emails"),
    extName: ".handlebars"
  })
);

export const sendTemplateMail = async ({
  to,
  subject,
  template,
  context
}) => {
  await transporter.sendMail({
    from: `"Vonnect" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    template,
    context
  });
};
