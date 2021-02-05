const models = require('../../../models');
const tokenLib = require('../../../lib/token');

exports.getMyScore = async (req, res) => {
  const token = req.headers['authorization'];

  try {
    const decoded = await tokenLib.verifyToken(token);

    const score = await models.User.getMyScore(decoded.id);

    res.status(200).json({
      code: 200,
      message: '자신의 점수 조회 성공',
      data: {
        score,
      }
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    })
  }
}