import express from "express";
import { signUp ,signIn, getUsers, deleteUser, updateUserRole, getUser} from "./user.controller.js";

const userRouter = express.Router();

userRouter.get("/getUsers", getUsers);
userRouter.post("/register", signUp);
userRouter.post("/login", signIn);
userRouter.post("/deleteUser/:id", deleteUser);
userRouter.put('/update-role/:userId', updateUserRole);
userRouter.get("/getuser/:id", getUser);

export default userRouter;