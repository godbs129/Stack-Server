const models = require('../../../models');
const token = require('../../../lib/token');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
    }

    let dbPW = checkId.dataValues.pw;
    let inputPw = body.pw;
    let salt = checkId.dataValues.salt;
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
    }

    const jwt = await token.createToken(body.id);

    console.log(body.id + " 로그인");

    return res.status(200).json({
      code: 200,
      message: '로그인 성공',
      data: {
        'token': jwt
      }
    })


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
      return res.status(403).json({
        code: 403,
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
      email: body.email,
      number: body.number,
      type: body.type,
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

exports.getUserRankBonusPoint = async (req, res) => {
  try {
    const rank = await models.User.getUserRankBonusPoint();

    res.status(200).json({
      code: 200,
      message: '상점 순위 조회 성공',
      data: {
        rank,
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    });
  };
}

exports.getUserRankMinusPoint = async (req, res) => {
  try {
    const rank = await models.User.getUserRankMinusPoint();

    res.status(200).json({
      code: 200,
      message: '벌점 순위 조회 성공',
      data: {
        rank,
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    });
  };
}

// 아직 미완성
exports.emailAuthentication = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await models.User.findOne({
      where: { email: email },
    });
    if (user) {
      const token = crypto.randomBytes(20).toString('hex');
      const data = {
        token,
        userId: user.id,
        ttl: 300,
      };

      models.Auth.create(data);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: process.env.gmail,
          pass: process.env.mail_pw,
        },
      });

      const mailOptions = {
        from: process.env.gmail,
        to: email,
        subject: '[Stack] 비밀번호 초기화',
        text: 'This is the authentication code to find the password!', // 내용
        html:
          `<p>비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.<p>` +
          `<a href='http://localhost:2030/resetaccount/${token}'>비밀번호 새로 입력하기</a>`, // TODO : 링크는 웹 라우터에 따라 변경하기
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('이메일 전송')
        }
      });
      return res.status(200).json({
        code: 200,
        message: '비밀번호 초기화 메일 전송 성공!',
      })
    } else {
      return res.status(401).json({
        code: 401,
        message: '이메일을 확인하세요.'
      })
    }
  } catch (e) {
    res.status(500).json({
      message: '서버 오류',
    });
  }
}