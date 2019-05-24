/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:31
  Description: 
*/
const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    /* 根据User的id从数据库中找到该用户的简历 */
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    //如果不简历存在
    if (!profile) {
      //返回400和信息
      return res.status(400).json({
        msg: 'There is no profile for this user'
      });
    }
    //返回简历对象
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;