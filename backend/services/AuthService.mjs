import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";import UserDetail from "../models/UserDetail.mjs";
import { Op } from "sequelize";


const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role_id: user.role_id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

export const loginUser = async (username, password,role_id) => {

  const user = await User.findOne({
  where: {
    role_id: role_id,
    [Op.or]: [
      { email: username },    // 'identifier' is the input from your login form
      { username: username }
    ]
  }
});

  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const payload = {
    id: user.id,
    role_id: user.role_id,
    email: user.email
  };

   return generateToken(payload);
};

export const signupUser = async ({ name, username, phone, email, password, role_id }) => {

  const exists = await User.findOne({ where: { email } });
  if (exists) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    username,
    password: hashed,
    role_id
  });

  UserDetail.create({
    user_id: user.id,
    phone: phone
});

// const link = `${process.env.FRONTEND_URL}/verify-email/${token}`;

// await sendTemplateMail({
//   to: email,
//   subject: "Verify Your Email",
//   template: "verifyEmail",
//   context: {
//     name,
//     link
//   }
// });

//   return generateToken(user);
};