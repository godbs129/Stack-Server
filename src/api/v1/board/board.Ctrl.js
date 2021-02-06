const models = require('../../../models');
const tokenLib = require('../../../lib/token');

exports.createBoard = async (req, res) => {
  const { body } = req;
  const token = req.headers['authorization'];

  try {
    const decoded = await tokenLib.verifyToken(token);

    await models.Board.create({
      title: body.title,
      content: body.content,
      userId: decoded.id,
    });

    return res.status(200).json({
      code: 200,
      message: '글 작성 성공',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    })
  }
}

exports.readMyBoard = async (req, res) => {
  const token = req.headers['authorization'];

  try {
    const decoded = await tokenLib.verifyToken(token);

    const board = await models.Board.findAll({
      where: {
        userId: decoded.id,
      },
    });

    if (!board) {
      return res.status(404).json({
        code: 404,
        message: '작성된 글이 없습니다',
      });
    }

    return res.status(200).json({
      code: 200,
      message: '자신의 글 조회 성공',
      data: {
        board,
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    })
  }
}

exports.readBoard = async (req, res) => {
  try {
    const board = await models.Board.findAll();

    return res.status(200).json({
      code: 200,
      message: '글 조회 성공',
      data: {
        board,
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    });
  }
}

exports.modifyBoard = async (req, res) => {
  const token = req.headers['authorization'];
  const { body } = req;
  const { idx } = req.params;

  try {
    const decoded = await tokenLib.verifyToken(token);

    const board = await models.Board.findOne({
      where: {
        idx: idx,
        userId: decoded.id,
      },
    });

    if (!board) {
      return res.status(404).json({
        code: 404,
        message: '게시글이 존재하지 않습니다',
      });
    }

    await models.Board.update({
      title: body.title,
      content: body.content,
    }, {
      where: { idx: idx }
    });

    return res.status(200).json({
      code: 200,
      message: '게시글 수정 성공'
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류',
    });
  }
}

exports.deleteBoard = async (req, res) => {
  const { idx } = req.params;
  const token = req.headers['authorization'];

  try {
    const decoded = await tokenLib.verifyToken(token);

    const board = await models.Board.findOne({
      where: {
        idx: idx,
        userId: decoded.id,
      },
    });

    if (!board) {
      return res.status(404).json({
        code: 404,
        message: '존재하지 않는 게시글입니다',
      });
    }

    await models.Board.deleteBoard(idx);

    return res.status(200).json({
      code: 200,
      message: '게시글 삭제 성공'
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: '서버 오류'
    })
  }
}