/*
  Created by IntelliJ IDEA.
  Type: JavaScript File
  User: John Zero
  DateTime: 2019/5/22 15:31
  Description: 
*/
const express = require('express');

const router = express.Router();

//@route    GET api/profile
//@desc     Test route
//@access   Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
