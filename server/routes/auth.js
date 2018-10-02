const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
// controller
const login = async (req, res) => {
  const { user_id, password } = req.body;
  const { rows: user } = await db.query(
    'SELECT * FROM public.user WHERE public.user.user_id = $1',
    [user_id],
  );
  console.log(user);
  if (!user) {
    throw new Error('No such user found');
  }
  // const valid = await bcrypt.compare(password, user[0].password);
  // if (!valid) {
  //   throw new Error('Invalid password');
  // }
  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
  const option = {
    maxAge: 1000 * 3600 * 24, // 1일 후 만료
    httpOnly: true, // web server에 의해서만 접근 가능
  };
  console.log(token);
  res.cookie('jwt', token, option);
  return res.json({
    user,
  });
};

router.post('/login', login);

module.exports = router;
