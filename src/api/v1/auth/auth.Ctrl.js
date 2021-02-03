const models = require('../../../models');
const token = require('../../../lib/token');
const crypto = require('crypto');

exports.login = async (req, res) => {
  const { body } = req;

  try {
    const checkId = await models.User.findOne({
      where: {
        id: body.id,
      }
    });

    if (!checkId) {
      return res.status(404).json({
        code: 404,
        message: '유저를 찾을 수 없습니다',
      });

      let dbPW = user.dataValues.pw;
      let inputPw = body.pw;
      let salt = user.dataValues.salt;
      let hashPw = crypto.createHash('sha512').update(inputPw + salt).digest('hex');

      const checkPw = await models.User.findOne({
        where: {
          id: body.id,
          pw: hashPw,
        },
      });

      if (!checkPw) {
        return res.status(401).json({
          code: 401,
          message: '비밀번호를 확인하세요',
        });

        const jwt = await token.createToken(body.id);

        console.log(body.id + " 로그인");

        return res.status(200).json({
          code: 200,
          message: '로그인 성공',
          data: {
            'token': jwt
          }
        })
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: '서버 오류',
    });
  }
}

exports.register = async (req, res) => {
  const { body } = req;

  try {
    const user = await models.User.findOne({
      where: {
        id: body.id,
      },
    });

    if (user) {
      return res.status(401).json({
        message: '이미 사용중인 아이디입니다.',
      });
    }

    let inputPw = body.pw;
    let salt = Math.round((new Date().valueOf() + Math.random())) + "";
    let hashPw = crypto.createHash('sha512').update(inputPw + salt).digest('hex');

    await models.User.create({
      id: body.id,
      pw: hashPw,
      name: body.name,
      number: body.number,
      salt: salt,
    });

    console.log(body.id + " 회원가입");
    return res.status(200).json({
      code: 200,
      message: '회원가입 성공',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    });
  }
}