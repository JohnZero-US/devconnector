/*
日期：2019-5-25
作者：刘奇隆 
*/

//引入库
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//贴文实体类
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {
            type: String,
            require: true
        },
        name: {
            type: String,
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

//导出
module.exports = Post = mongoose.model('post', PostSchema);