import { token } from "morgan";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUpController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    if (!answer) {
      return res.send({ error: "answer is required" });
    }

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      return res.status(201).send({
        success: false,
        message: "You are already sign-up please sign-in",
      });
    }

    const hashPass = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashPass,
      phone,
      address,
      answer,
    }).save();

    res
      .status(201)
      .send({ success: true, message: "user is successfully sign-up", user });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Your email is invalid",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(201).send({
        success: false,
        message: "Your password is invalid",
      });
    }

    var token = jwt.sign({ _id: user._id }, process.env.JWT_SECERT);

    res.status(200).send({
      success: true,
      message: "user is successfully sign-in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "new password is required" });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({ message: "Wrong Email or Answer" });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
export const testController = (req, res) => {
  res.send("test route");
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.body._id);
    if (password && password.length < 6) {
      return res.json({ error: "Password is required greater than 6 letter" });
    }

    const hashedpass = password ? await hashPassword(password) : undefined;

    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedpass || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "user update successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
