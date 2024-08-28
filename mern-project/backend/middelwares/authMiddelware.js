import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    var decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECERT);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`error is admin authorization ${error}) `);
    res.status(401).send({
      success: false,
      message: "error is admin authorization",
      error,
    });
  }
};
