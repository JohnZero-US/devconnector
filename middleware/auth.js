/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/23 22:31
  Description: 
*/

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //从请求头中获取JWT
    const token = req.header('x-auth-token');
    //如果不存在JWT
    if (!token) {
        //返回消息
        return res.status(401).json({
            msg: 'No token, authorization defined'
        });
    }

    //验证JWT有效性
    try {
        //解码后的对象
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //对比
        req.user = decoded.user;
        next();
    } catch (e) {
        //验证不通过
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}