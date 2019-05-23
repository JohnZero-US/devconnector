/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:02
  Description: 
*/

const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

/*异步执行连接数据库*/
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            //启用新的URL解析器
            useNewUrlParser: true,
            //自动创建下标
            useCreateIndex: true
        });
        //
        console.log('MongoDB Connected...');
    } catch (e) {
        console.error(e.message);
        //程序退出
        process.exit(1);
    }
}

module.exports = connectDB;