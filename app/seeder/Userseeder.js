require('dotenv').config({ path: "../../.env" })
const mongoose = require("mongoose");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRound = 10;

mongoose.connect(process.env.DATABASE_URL);

const seedUsers = async () => {
  try {

    await User.deleteMany();
    const hashPassword = await bcrypt.hash('test@123', saltRound);
    const users = [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin",
        contact : "123456"
      },
      {
        name: "user",
        email: "user@gmail.com",
        password: hashPassword,
        role: "user",
        contact : "3165165"
      }
    ];

    await User.insertMany(users);

    console.log("Admin and Staff Seeded Successfully");

    mongoose.connection.close();

  } catch (error) {
    console.log(error);
  }
};

seedUsers();