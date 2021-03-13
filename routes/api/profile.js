const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/me', auth, async (req, res) => {

  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if(!profile){
      res.status(400).json({ errors: [{msg: 'No profile exists for this user'}]});
    }

    res.json(profile);

  } catch(err){
    console.log(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;