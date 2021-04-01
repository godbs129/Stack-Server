const models = require('../../../models');
const tokenLib = require('../../../lib/token');

exports.getMyScore = async (req, res) => {
  const token = req.headers['authorization'];

  try {
    const decoded = await tokenLib.verifyToken(token);

    const score = await models.Score.getMyScore(decoded.id);

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

exports.getMyScoreByType = async (req, res) => {
  const token = req.headers['authorization'];
  const query = req.query.type;

  try {
    const decoded = await tokenLib.verifyToken(token);

    const type = parseInt(query);
    const user = await models.User.getUserNameAndNumber(decoded.id);
    const score = await models.Score.getMyScoreByType(decoded.id, type);

    res.status(200).json({
      code: 200,
      message: '자신의 점수 조회 성공',
      data: {
        user,
        score,
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    })
  };
}

exports.givePoint = async (req, res) => {
  const token = req.headers['authorization'];
  const { body } = req;

  try {
    const decoded = await tokenLib.verifyToken(token);
    const checkId = await models.User.findOne({
      where: {
        id: decoded.id,
      }
    });

    if (checkId.type == 0) {
      return res.status(401).json({
        code: 401,
        message: '권한이 없습니다',
      });
    };

    const checkUser = await models.User.findOne({
      where: {
        id: body.userId,
      }
    });

    if (!checkUser) {
      return res.status(404).json({
        code: 404,
        message: '존재하지 않는 사용자 입니다!',
      });
    }


    await models.Point.create({
      type: body.type,
      point: body.point,
      reason: body.reason,
      userId: body.userId,
      giver: checkId.name,
    });

    if (body.type == 0) {
      await models.User.updateUserBonusPoint(decoded.id, body.point);
    } else if (body.type == 1) {
      await models.User.updateUserMinusPoint(decoded.id);
    }

    res.status(200).json({
      code: 200,
      message: '점수 부여 성공',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    });
  };
};