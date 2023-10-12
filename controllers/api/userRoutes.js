const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    var userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.dataValues.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    console.log(userData)

    if (!userData) {
      console.log("no user found");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log("THIS IS THE PASSWORD " + req.body.password)

    const validPassword = await userData.checkPassword(req.body.password);
    const validPassword2 = await User.findOne({ where: { password: req.body.password } });

    if (!validPassword && !validPassword2) {
      console.log("no password match");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
