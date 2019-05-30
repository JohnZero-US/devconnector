/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:31
  Description: 
*/
//加载对象
const express = require("express");
const { check, validationResult } = require("express-validator/check");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//获取登陆用户的简历
//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private
router.get("/me", auth, async (req, res) => {
  try {
    /* 根据User的id从数据库中找到该用户的简历，并包含用户集合的名字和头像 */
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    //如果不简历存在
    if (!profile) {
      //返回400和信息
      return res.status(400).json({
        msg: "There is no profile for this user"
      });
    }
    //返回简历对象
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//新增或更新简历
//@route    POST api/profile
//@desc     Create or update users profile
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty() /* 当前工作状态 */,
      check("skills", "Skills is required")
        .not()
        .isEmpty() /* 拥有的技能 */
    ]
  ],
  async (req, res) => {
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
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    //构建社交对象
    profileFields.social = {};
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
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        );
        //返回简历对象
        return res.json(profile);
      }
      //如果不存在则创建新的简历
      profile = new Profile(profileFields);
      await profile.save();
      //返回
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//获取所有简历
//@route    Get api/profile
//@desc     Get all profiles
//@access   Public
router.get("/", async (req, res) => {
  try {
    //查找简历集合，并包含用户集合的名字和头像
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    //返回简历
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//根据用户id获取简历
//@route    Get api/profile/user/:user_id
//@desc     Get profile by user_id
//@access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    //根据用户Id查找简历，并包含用户集合的名字和头像
    const profile = await Profile.findOne({
      //路径上user_id参数
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    //如果简历为空
    if (!profile) {
      return res.status(400).json({
        msg: "Profile not found"
      });
    }

    //返回简历
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    //如果id参数不正确
    if (error.kind == "ObjectId") {
      return res.status(400).json({
        msg: "Profile not found"
      });
    }
    //其他错误
    res.status(500).send("Server Error");
  }
});

//删除账号
//@route    Delete api/profile
//@desc     Delete profile ,user & posts
//@access   Private
router.delete("/", auth, async (req, res) => {
  try {
    //删除用户的所有贴文
    await Post.deleteMany({ user: req.user.id });
    //根据用户Id删除用户的简历纪录
    await Profile.findOneAndRemove({
      user: req.user.id
    });
    //根据用户Id删除用户
    await User.findOneAndRemove({
      _id: req.user.id
    });
    res.json({
      msg: "User deleted"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//添加工作经验
//@route    Put api/profile/experience
//@desc     Add profile experience
//@access   Private
router.put(
  "/experience",
  [
    auth,
    [
      //验证
      check("title", "Title is require")
        .not()
        .isEmpty(), //标题
      check("company", "Company is require")
        .not()
        .isEmpty(), //公司
      check("form", "From data is require")
        .not()
        .isEmpty() //开始工作日期
    ]
  ],
  async (req, res) => {
    //获取验证错误
    const errors = validationResult(req);
    if (!errors) {
      //返回验证错误
      return res.status(400).json({
        errors: errors.array()
      });
    }
    //获取请求的参数并成为工作经验对象
    const newExp = ({
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body);

    try {
      //从数据库中找到简历
      const profile = await Profile.findOne({
        user: req.user.id
      });
      //填充工作经验
      profile.experience.unshift(newExp);
      //保存
      await profile.save();
      //返回
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//删除工作经验
//@route    Put api/profile/experience
//@desc     Delete experience from profile
//@access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    //从数据库中找到简历
    const profile = await Profile.findOne({
      user: req.user.id
    });
    //获取要删除的工作经历的下标
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);
    //移除工作经历对象
    profile.experience.splice(removeIndex, 1);
    //保存简历
    await profile.save();
    //返回
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//添加教育经历
//@route    Put api/profile/education
//@desc     Add profile education
//@access   Private
router.put(
  "/education",
  [
    auth,
    [
      //验证
      //学校
      check("school", "School is require")
        .not()
        .isEmpty(),
      //学历
      check("degree", "Degree is require")
        .not()
        .isEmpty(),
      //专业
      check("fieldofstudy", "Field of study is require")
        .not()
        .isEmpty(),
      //开始学习日期
      check("form", "From data is require")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //获取验证错误
    const errors = validationResult(req);
    if (!errors) {
      //返回验证错误
      return res.status(400).json({
        errors: errors.array()
      });
    }
    //获取请求的参数并成为教育经验对象
    const newEdu = ({
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body);

    try {
      //从数据库中找到简历
      const profile = await Profile.findOne({
        user: req.user.id
      });
      //填充工作经验
      profile.education.unshift(newEdu);
      //保存
      await profile.save();
      //返回
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//删除教育经验
//@route    Put api/profile/education
//@desc     Delete education from profile
//@access   Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    //从数据库中找到简历
    const profile = await Profile.findOne({
      user: req.user.id
    });
    //获取要删除的工作经历的下标
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);
    //移除工作经历对象
    profile.education.splice(removeIndex, 1);
    //保存简历
    await profile.save();
    //返回
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//根据用户id从github获取用户的仓库集合
//@route    Get api/profile/github/:username
//@desc     Get user repos from Github
//@access   Public
router.get("/github/:username", (req, res) => {
  try {
    //创建选项对象
    const options = {
      //github uri路径
      uri:
        `https://api.github.com/users/${req.params.username}/repos?` +
        `per_page=50&` + //获取页数
        `sort=created:asc&` + //排序(创建日期顺序)
        `client_id=${config.get("githubClientId")}&` + //id
        `client_secret=${config.get("githubSecret")}`, //密钥
      //请求方式GET
      method: "GET",
      //头部UA node.js
      headers: {
        "user-agent": "node.js"
      }
    };
    //按照选项对象发送请求
    request(options, (error, response, body) => {
      //打印错误
      if (error) console.error(error);
      //
      if (response.statusCode !== 200) {
        return res.status(404).json({
          msg: "No Github profile found"
        });
      }
      //最后返回对象
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
