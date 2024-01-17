import { response } from "express";
import { userMapper } from "../mappers/userMapper.js";
import { userModel } from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../config/bcrypt.js";
import { generateJWT } from "../helpers/jwt.js";

const checkUserEmailAlreadyExist = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    return {
      emailExist: user,
      user,
    };   
  } catch (error) {
    console.log('db connection error');
    return {
      emailExist: false,
      user: null,
    };
  }
};

export const createUser = async (req, res = response) => {
  // const user = userMapper(req.body);
  try {
    const { emailExist } = await checkUserEmailAlreadyExist(req.body.email);
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        message: 'User email already exists',
      });
    }

    // db save user
    const user = new userModel(userMapper(req.body));
    // hashing password
    user.password = hashPassword(user.password);

    await user.save();

    // token
    const token = await generateJWT(user.id, user.name);
  
    res.status(201).json({
      ok: true,
      // message: 'Register made',
      user: {
        uid: user.id,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const loginUser = async (req, res = response) => {
  try {
    const { password, email } = userMapper(req.body);
    const { emailExist, user } = await checkUserEmailAlreadyExist(email);

    if (!emailExist) {
      return res.status(400).json({
        ok: false,
        // message: 'User email does not exists',
        message: 'User email or password does not exists',
      });
    }

    // check password
    const validPassword = comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid email or password'
        // message: 'Invalid password'
      });
    }

    // token
    const token = await generateJWT(user.id, user.name);
  
    res.json({
      ok: true,
      user: {
        uid: user.id,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const checkUserToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    user: {
      uid,
      name,
    },
    token,
  });
};
