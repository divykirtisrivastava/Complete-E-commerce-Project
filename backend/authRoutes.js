// routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('./dataBaseConfig'); // Corrected path

// Google OAuth Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists in database, if not, create new user
    let sql = 'SELECT * FROM clientdetail WHERE googleId = ?';
    db.query(sql, [profile.id], (err, rows) => {
      if (err) return done(err);
      if (rows.length) {
        const user = rows[0];
        return done(null, {
          id: user.id,
          username: user.username,
          email: user.email,
          userImage: user.userImage,
        });
      } else {
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          userImage: profile.photos[0].value,
          // Add additional fields as needed
        };

        sql = 'INSERT INTO clientdetail SET ?';
        db.query(sql, newUser, (err, result) => {
          if (err) return done(err);
          newUser.id = result.insertId;
          done(null, {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            userImage: newUser.userImage,
          });
        });
      }
    });
  } catch (err) {
    console.error(err);
    done(err, null);
  }
}));

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let sql = 'SELECT * FROM clientdetail WHERE id = ?';
  db.query(sql, [id], (err, rows) => {
    if (err) return done(err);
    const user = rows[0];
    done(null, {
      id: user.id,
      username: user.username,
      email: user.email,
      userImage: user.userImage,
    });
  });
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user;
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      userImage: user.userImage,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.redirect(`http://localhost:5173/${token}`);
  }
);

// Verify JWT token route
router.get('/verify', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send(decoded);
  } catch (err) {
    res.status(401).send('Invalid token');
  }
});

module.exports = router;
