const Users = require("../../models/Users");
const bcrypt = require("bcrypt");
const saltRound = 10;
const RegisterController = async (req, res) => {
  try {
    const Usersdata = await Users.findOne({ email: req?.body?.email });

    if (Usersdata) {
      return res.status(200).json({
        success: false,
        result: "",
        message: "User ID already exists",
      });
    }

    const hashPassword = await bcrypt.hash(req?.body?.password, saltRound);
    const createUser = await Users.create({
      name: req?.body?.name,
      email: req?.body?.email,
      password: hashPassword,
      role: req?.body?.role ?? "customer",
    });

    if (createUser) {
      return res.status(200).json({
        success: true,
        result: "",
        message: "User registered in successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Unable to create user",
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      result: "",
      message: error.message,
    });
  }
};

module.exports = { RegisterController };
