/* eslint-disable arrow-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import UserModel from '../model/user';

const router = express.Router();
// eslint-disable-next-line operator-linebreak
const template =
  '<h1>Welcome to Localizea2z !</h1><p><strong>Congratulations</strong> on signing-up for po entry system.</p><p>Please confirm your email by clicking <a href="{url}" target="_blank">here</a>.</p>';

function getEmailTemplate(request) {
  const { hostname, user } = request;
  const { port } = request.app.settings;
  let baseUrl;
  if (hostname === 'localhost') {
    baseUrl = `http://${hostname}:${port}`;
  } else {
    baseUrl = `https://${hostname}`;
  }
  const registerUrl = `${baseUrl}/user/confirm/${user.userToken}`;
  const updatedTemplate = template.replace('{url}', registerUrl);
  return updatedTemplate;
}

async function sendConfirmationEmail(req) {
  const { hostname } = req;
  let transporter;
  if (hostname === 'localhost') {
    const testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });
  } else {
    transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.email_sender_id,
        pass: process.env.email_sender_pass
      }
    });
  }
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Localizea2z 🚥" <do-not-reply@Localizea2z.com>', // sender address
    to: 'amit.hetawal@gmail.com', // list of receivers
    subject: 'Confirm your email for po entry 👮', // Subject line
    html: getEmailTemplate(req) // html body
  });
  if (hostname === 'localhost') {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    try {
      await sendConfirmationEmail(req);
      next();
    } catch (err) {
      next(err);
    }
  },
  async (req, res) => {
    res.json({ message: 'Registration successful' });
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, errMessage) => {
    try {
      if (err || !user) {
        const finalMessage = errMessage.message || 'An Error occured';
        const error = new Error(finalMessage);
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 1);

        const body = {
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          expiry: parseInt(expirationDate.getTime() / 1000, 10)
        };
        // Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, 'top_secret');
        // Send back the token to the user
        const finalUser = {
          token,
          isAdmin: user.isAdmin,
          email: user.email
        };
        return res.json({ user: finalUser });
      });
    } catch (error) {
      return next(error);
    }
    return new Error('test');
  })(req, res, next);
});

router.get('/confirm/:userToken', async (req, res, next) => {
  const { userToken } = req.params;
  const user = await UserModel.findOne({
    userToken
  });
  if (!user) {
    // If the user isn't found in the database, return a message
    return next(new Error('User not found'));
  }
  if (user.isVerified) {
    // If the user isn't found in the database, return a message
    return next(new Error('User is already verified'));
  }

  await UserModel.update({ email: user.email }, { isVerified: true });
  return res.send(
    `Hi ${user.email}! <br/> You are now <strong>confirmed</strong/> to use PO entry system.`
  );
});

export default router;
