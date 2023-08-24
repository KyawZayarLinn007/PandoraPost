const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserInputError = require("../exceptions/UserInputError");

const createToken = (id, email) => {
  let payload = {
    id,
    email,
  };

  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

module.exports.register_post = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  try {
    let email_user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (email_user) {
      throw new UserInputError("Email already registered!");
    } else if (password !== confirm_password) {
      throw new UserInputError(
        "Password and confirm Password must be the same!"
      );
    } else {
      //bcrypt hashed
      let salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
      let hashedPassword = await bcrypt.hash(password, salt);

      let user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      let token = createToken(user.id, user.email);
      res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

      res.status(201).json({
        data: {
          id: user.id,
          email: user.email,
        },
        error: null,
      });
    }
  } catch (error) {
    let statusCode = 500;
    if (error instanceof UserInputError) {
      statusCode = 400;
    }
    res.status(statusCode).json({
      data: null,
      error: {
        status: statusCode,
        message: error.message,
      },
    });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UserInputError("Email not registered");
    }

    let isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      let token = createToken(user.id, user.email);
      res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

      res.status(200).json({
        data: {
          id: user.id,
          email: user.email,
        },
        error: null,
      });
    } else {
      throw new UserInputError("Incorrect Password");
    }
  } catch (error) {
    let statusCode = 500;
    if (error instanceof UserInputError) {
      statusCode = 400;
    }
    res.status(statusCode).json({
      data: null,
      error: {
        status: statusCode,
        message: error.message,
      },
    });
  }
};

module.exports.logout_post = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    data: "token deleted",
    error: null,
  });
};

module.exports.verify_auth_post = async (req, res) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      throw new Error("Not Authenticated");
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      data: payload,
      error: null
    });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      data: null,
      error: {
        status: 401,
        message: error.message,
      },
    });
  }
};
