const tokenLib = require('../lib/token');
const models = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({
      status: 400,
      message: '토큰 전송되지 않음',
    });
  }

  try {
    const decoded = await tokenLib.verifyToken(token);
    if (decoded.sub !== 'token') {
      return res.status(403).json({
        status: 403,
        message: '잘못된 토큰',
      })
    }
    req.User = await models.User.findOne({
      where: {
        id: decoded.id
      }
    });
    return next();
  } catch (err) {
    switch (err.message) {
      case 'jwt must be provided':
        return res.status(400).json({
          status: 400,
          message: '토큰이 전송되지 않았습니다.',
        });
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        return res.status(401).json({
          status: 401,
          message: '위조된 토큰입니다.',
        });
      case 'jwt expired':
        return res.status(410).json({
          status: 410,
          message: '토큰이 만료되었습니다.',
        });
      default:
        console.log(err.message);
        return res.status(500).json({
          status: 500,
          message: '다시 시도해 주세요.',
        });
    }
  }
}