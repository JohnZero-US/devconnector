/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:31
  Description: 
*/
const express = require('express');

const {
  check,
  validationResult
} = require('express-validator/check');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private
router.get('/me', auth, async (req, res) => {
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

//@route    POST api/profile
//@desc     Create or update users profile
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(), /* 当前工作状态 */
      check('skills', 'Skills is required').not().isEmpty() /* 拥有的技能 */
    ]
  ],
  (req, res) => {
    //验证参数
    const errors = validationResult(req);
    //如果参数有错误
    if (!errors.isEmpty()) {
      //返回错误信息集合
      return res.status(400).json({
        errors: errors.array()
      });
    }

    //解析请求对象
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // 构建建立对象
    const profileFields = {};
    profileFields.user = req.user.id;
    //如果不为空就赋值
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    //分割技能字符串为技能数组
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    //构建社交对象
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      //根据用户id从数据库中查找简历
      let profile = await Profile.findOne({
        user: req.user.id
      });
      //如果简历存在
      if (profile) {
        //查找并更新简历
        profile = await Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }

);

module.exports = router;