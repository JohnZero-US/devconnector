/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:31
  Description: 
*/
//引入库
const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator/check');
const auth = require('../../middleware/auth');
//实体类
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//添加贴文
//@route    POST api/posts
//@desc     Create a post
//@access   Public
router.post('/', [
    auth,
    [
      check('text', 'Text is required').not().isEmpty() //文章不为空
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //有验证错误
    if (!errors.isEmpty()) {
      //返回错误信息
      return res.status(400).json({
        errors: errors.array()
      });
    }
    //
    try {
      //根据用户id获取用户信息
      const user = await User.findById(req.user.id).select('-password');
      //创建新贴文对象
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      //保存到数据库
      const post = await newPost.save();
      //返回
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }

  });


//获取所有贴文
//@route    GET api/posts
//@desc     Get all post
//@access   private
router.get('/', auth, async (req, res) => {
  try {
    //
    const posts = await Post.find().sort({
      date: -1
    });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


//根据贴文id查找贴文
//@route    GET api/posts/:id
//@desc     Get post by ID
//@access   private
router.get('/:id', auth, async (req, res) => {
  try {
    //
    const post = await Post.findById(req.params.id);
    //
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    //
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'ObjectId error'
      });
    }
    res.status(500).send('Server Error');
  }
});

//根据贴文id删除贴文
//@route    DELETE api/posts/:id
//@desc     DELETE post by ID
//@access   private
router.delete('/:id', auth, async (req, res) => {
  try {
    //
    const post = await Post.findById(req.params.id);
    //检查贴文是否存在
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    //检查删除贴文操作是否本人
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized'
      });
    }
    //删除贴文
    await post.remove();
    //返回
    res.json({
      msg: 'Post removed'
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'ObjectId error'
      });
    }
    res.status(500).send('Server Error');
  }
});

//为贴文点 like
//@route    PUT api/posts/like/:id
//@desc     Like a post
//@access   private
router.put("/like/:id", auth, async (req, res) => {
  try {
    //
    const post = await Post.findById(req.params.id);
    //检查是否已经点过like了
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({
        msg: 'Post already liked'
      });
    }
    //为此贴文添加like
    post.likes.unshift({
      user: req.user.id
    });
    //保存
    await post.save();
    //返回like集合
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



//为贴文取消 like
//@route    PUT api/posts/like/:id
//@desc     Unlike a post
//@access   private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    //
    const post = await Post.findById(req.params.id);
    //检查是否已经点过like了
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({
        msg: 'Post has not yet been liked'
      });
    }
    //根据用户id找到贴文的like下标
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    //移除该like
    post.likes.splice(removeIndex, 1);
    //保存
    await post.save();
    //返回like集合
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


//添加评论
//@route    POST api/posts/comment/:id
//@desc     Comment on post
//@access   Private
router.post('/comment/:id', [
    auth,
    [
      check('text', 'Text is required').not().isEmpty() //文章不为空
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //有验证错误
    if (!errors.isEmpty()) {
      //返回错误信息
      return res.status(400).json({
        errors: errors.array()
      });
    }
    //
    try {
      //根据用户id获取用户信息
      const user = await User.findById(req.user.id).select('-password');
      //获取贴文对象
      const post = await Post.findById(req.params.id);
      //创建新评论对象
      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      //附加到该贴文的评论集合
      post.comments.unshift(newComment);
      //保存到数据库
      await post.save();
      //返回
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }

  });

//删除评论
//@route    DELETE api/posts/comment/:id/:comment_id
//@desc     Delete comment
//@access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    //获取贴文对象
    const post = await Post.findById(req.params.id);
    //从评论集合中查找评论
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    //如果评论不存在
    if (!comment) {
      return res.status(404).json({
        msg: 'Comment does not exist'
      });
    }
    //检查是否可以删除评论
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized'
      });
    }

    //根据用户id找到贴文的评论下标
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    //移除该评论
    post.comments.splice(removeIndex, 1);
    //保存
    await post.save();
    //返回评论集合
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;