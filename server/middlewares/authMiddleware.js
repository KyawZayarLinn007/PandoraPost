const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

module.exports.isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      throw new Error("Not Authenticated");
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      data: null,
      error: {
        status: 401,
        message: error.message,
      },
    });
  }
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.payload;
  let { postId } = req.params;
  postId = parseInt(postId);

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (id == post?.user?.id) {
      next();
    } else {
      res.status(403).json({
        data: null,
        error: {
          status: 403,
          message: "Unauthorized",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
};
