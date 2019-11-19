/* eslint-disable arrow-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    res.json({ message: 'Registration successful', user: req.user });
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        console.log(err);
        const error = new Error('An Error occured');
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

export default router;
