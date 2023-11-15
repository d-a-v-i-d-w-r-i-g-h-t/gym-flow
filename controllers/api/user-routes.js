const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/authorize');

//get route to get all users
router.get('/', async (req,res) => {
  try{
  const usersdb = await User.findAll();
  res.status(200).json(usersdb)
  }catch(err){
    res.status(500).json(err);
  }
});

//get route to find a user given an id
router.get('/:id', async (req,res)=>{
  try{
  const userdb = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(userdb);
}catch(err){
  res.status(500).json(err)
}
});

// GET route to check if username is not already in database
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // find one user by username
    const existingUser = await User.findOne({
      where: {
        user_name: username,
      },
    });

    // provide response if username is unique or not
    res.json({ isUnique: !existingUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//post route to create a user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ success: true, data: userData});
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//post route to find a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { user_name: req.body.user_name } });

    if (!userData) {
      res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;
      
      res.json({ success: true, data: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//post route to remove session data
router.post('/logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else { // using withAuth, this else will never actually occur
    res.status(500).json({ success: false, error: 'Error logging out' });
  }
});

module.exports = router;
