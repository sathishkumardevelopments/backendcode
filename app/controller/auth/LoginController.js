const Users = require("../../models/Users");
const bcrypt = require("bcrypt");
const saltRound = 10;

const LoginController = async (req, res) => {
  try {
    console.log("Typed:", JSON.stringify(req.body.userid));
    
    const Usersdata = await Users.findOne({
      email: req?.body?.userid?.trim().toLowerCase(),
    });
    console.log("DB email:", JSON.stringify(Usersdata?.email));
    if(!Usersdata){
      return res.status(200).json({
        success: false,
        result: "",
        message: "User not available",
      });
    }
    console.log(1)
    const passwords = req?.body?.password?.trim();
    const checkPw = await bcrypt.compare(passwords,Usersdata?.password)
    console.log("Typed:", JSON.stringify(req.body.userid));
    if (checkPw) {
      return res.status(200).json({
        success: true,
        result: Usersdata,
        message: "User logged in successfully",
      });
    } else {
      return res.status(200).json({
        success: false,
        result: "",
        message: "Password is wrong",
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

module.exports = { LoginController };
