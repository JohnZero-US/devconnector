/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:31
  Description: 
*/
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');

//@route    GET api/users
//@desc     Register user
//@access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more character').isLength({min: 6})
], async (req, res) => {
    //获取验证结果
    const errors = validationResult(req);
    //判断
    if (!errors.isEmpty()) {
        //返回400错误提示
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;
    //
    try {
        //从MongoDB中查找用户
        let user = await User.findOne({email});
        if (user) {
            //如果用户存在
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }
        //定义头像URL
        const avatar = gravatar.url(email, {
            s: '80',
        });

        //创建实体对象
        user = new User({
            name,
            email,
            avatar,
            password
        });
        //设置加密算法
        const salt = await bcrypt.genSalt(10);
        //对原来密码进行加密
        user.password = await bcrypt.hash(password, salt);
        //保存到数据库
        await user.save();

        //
        const playload = {
            user: {
                id: user.id
            }
        }

        //生成jwt 并且返回 jwt字符串
        jwt.sign(
            playload,
            config.get('jwtSecret'),
            {expiresIn: 36000},
            (err, token) => {
                if (err) throw  err;
                res.json({token});
            }
        );

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server error!');
    }
});

module.exports = router;
