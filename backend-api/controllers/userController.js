const db = require("../db/userQueries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 30 characters.";
const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Username ${lengthErr}`),
  body("password")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Password: ${lengthErr}`),
];

const postSignUp = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(req.body);
      const user = await db.createUserQuery(req.body.username, hashedPassword);

      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },
];

const getUserData = async (req, res) => {
  const userId = req.user.id;

  try {
    const data = await db.getUserDataQuery(parseInt(userId));
    res.json(data);
  } catch (error) {
    console.error("Error fetching user data", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await db.getAllUsersQuery();
    res.json({ data });
  } catch (error) {
    console.error("Error fetching user data", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};
module.exports = {
  postSignUp,
  getUserData,
  getAllUsers,
};
