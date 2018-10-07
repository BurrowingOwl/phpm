const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const { checkCookie } = require('../middlewares/auth');

const router = express.Router();

// controller
const login = async (req, res) => {
  const { user_id, password } = req.body;
  const { rows: users } = await db.query(
    'SELECT * FROM public.user WHERE public.user.user_id = $1',
    [user_id],
  );
  const handleError = () => {
    throw new Error('잘못된 아이디 혹은 패스워드.');
  };
  if (!users || users.length <= 0) {
    return handleError();
  }
  // const valid = await bcrypt.compare(password, user[0].password);
  // if (!valid) {
  //   throw new Error('Invalid password');
  // }
  const user = users[0];
  if (!await bcrypt.compare(password, user.password)) {
    return handleError();
  }
  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
  const option = {
    maxAge: 1000 * 3600 * 24, // 1일 후 만료
    httpOnly: true, // web server에 의해서만 접근 가능
  };
  res.cookie('jwt', token, option);
  const payloadUser = {
    user_id: user.user_id,
    username: user.username,
  };
  return res.json({
    user: payloadUser,
  });
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  return res.json({
    success: true,
  });
};

const verify = async (req, res) => {
  const verifyFailed = () => res.json({ verified: false });
  if (!req.userId) {
    return verifyFailed();
  }
  // TODO: password 제외 필요.
  const { rows: users } = await db.query(
    'SELECT * FROM public.user WHERE public.user.user_id = $1',
    [req.userId],
  );
  const user = users[0];
  if (!user) {
    return verifyFailed();
  }
  return res.json({
    verified: true,
    user,
  });
};
// router setting
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', checkCookie, verify);

module.exports = router;
