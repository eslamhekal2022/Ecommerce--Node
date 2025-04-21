import { userModel } from "../../Model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

 export const signUp = async(req,res) =>{
try{
    const{name,email,password}=req.body

    console.log("name",name)
    console.log("email",email)
    console.log("password",password)
const ExistingEmail=await userModel.findOne({email})
if(ExistingEmail){
    res.status(400).json({message:"user already registered",success:false})
}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
    role:"user",
  });
  await newUser.save();

 return res.status(201).json({ message: "User registered successfully",success:true });
}
 catch (error) {
  console.error("Server Error:", error); // طباعة الخطأ في الـ terminal
 return res.status(500).json({ message: "Server error", error: error.message });}
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Server Error:", error); // طباعة الخطأ في الـ terminal
    res.status(500).json({ message: "Server error", error: error.message });}
  }


  export const getUsers = async (req, res) => {
    try {
      const allUsers = await userModel.find().select("-password");

      const countUsers=allUsers.length
      res.status(200).json({
        message: "All users retrieved successfully",
        success: true,
        data: allUsers,
        count:countUsers
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: error.message
      });
    }
  };
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const userDel = await userModel.findByIdAndDelete(id);
  
      if (!userDel) {
        return res.status(404).json({
          message: "User not found",
          success: false
        });
      }
  
      res.status(200).json({
        message: "User deleted successfully",
        success: true,
        data: userDel
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: error.message
      });
    }
  };

  export const updateUserRole = async (req, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;
  
      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ success: false, message: "Invalid role provided" });
      }
  
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong", error });
    }
  };
  

export const getUser = async (req, res) => {
  const { id } = req.params;
const user=await userModel.findById(id)

res.status(200).json({message:"userAho",success:true,data:user})
}