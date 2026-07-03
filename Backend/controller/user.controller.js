import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

/* ==== SIGNUP ==== */    
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    await createdUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ==== LOGIN ====*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ==== FORGOT PASSWORD APIs ==== */

/* ✅ STEP 1: CHECK USER EXISTS */
export const checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Account does not exist" });
    }

    res.status(200).json({ message: "User found" });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*  RESET PASSWORD */
export const resetPasswordDirect = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Account does not exist" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    user.password = hashPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};