const { PrismaClient } = require("@prisma/client");
const ContentNotFoundError = require("../exceptions/ContentNotFoundError");
const prisma = new PrismaClient();

const findPostWithId = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};

module.exports.post_create = async (req, res) => {
  const { title, content, user_id } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        user_id,
      },
    });

    res.status(201).json({
      data: post,
      error: null,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      data: null,
      error: error.message,
    });
  }
};

module.exports.posts_get = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: posts,
      error: null,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      data: null,
      error: error.message,
    });
  }
};

module.exports.single_post_get = async (req, res) => {
  let { postId } = req.params;
  postId = parseInt(postId);

  try {
    const post = await findPostWithId(postId);

    if (!post) {
      throw new ContentNotFoundError("Post with the given id doesn't exits");
    } else {
      res.status(200).json({
        data: post,
        error: null,
      });
    }
  } catch (error) {
    let statusCode = 500;
    if(error instanceof ContentNotFoundError) {
      statusCode = 404;
    }
    res.status(statusCode).json({
      data: null,
      error: error.message,
    });
  }
};

module.exports.post_update = async (req, res) => {
  let { postId } = req.params;
  postId = parseInt(postId);

  try {
    const post = await findPostWithId(postId);

    if (!post) {
      throw new ContentNotFoundError("Post with the given id doesn't exits");
    }

    const updated_post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: req.body,
    });

    res.status(201).json({
      data: updated_post,
      error: null,
    });
  } catch (error) {
    let statusCode = 500;
    if(error instanceof ContentNotFoundError) {
      statusCode = 404;
    }
    res.status(statusCode).json({
      data: null,
      error: error.message,
    });
  }
};

module.exports.post_delete = async (req, res) => {
  let { postId } = req.params;
  postId = parseInt(postId);

  try {
    const post = await findPostWithId(postId);

    if (!post) {
      throw new ContentNotFoundError("Post with the given id doesn't exits");
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.status(204).json({});
  } catch (error) {
    let statusCode = 500;
    if(error instanceof ContentNotFoundError) {
      statusCode = 404;
    }
    res.status(statusCode).json({
      data: null,
      error: error.message,
    });
  }
};
