/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:31
  Description: 
*/
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    //到数据库验证是否存在此用户
    const user = await User.findById(req.user.id).select("-password");
    //返回User对象
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    //获取验证结果
    const errors = validationResult(req);
    //判断
    if (!errors.isEmpty()) {
      //返回400错误提示
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { name, email, password } = req.body;
    //
    try {
      //从MongoDB中查找用户
      let user = await User.findOne({
        email
      });
      //
      if (!user) {
        //如果用户不存在
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }

      //加密后比对密码是否正确
      const isMatch = await bcrypt.compare(password, user.password);
      //
      if (!isMatch) {
        //如果用户密码不匹配
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }
      //
      const playload = {
        user: {
          id: user.id
        }
      };

      //生成jwt 并且返回 jwt字符串
      jwt.sign(
        playload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error!");
    }
  }
);

module.exports = router;
