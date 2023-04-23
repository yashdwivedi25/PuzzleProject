const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('./models/User');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/puzzle',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  let errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Please enter all fields' });
  }

  if (password !== confirmPassword) {
    errors.push({ message: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ message: 'Password must be at least 6 characters long' });
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, confirmPassword });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          errors.push({ message: 'Email already registered' });
          res.render('register', { errors, name, email, password, confirmPassword });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;

              const newUser = new User({
                name: name,
                email: email,
                password: hash
              });

              newUser.save()
                .then(() => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/login');
                })
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
