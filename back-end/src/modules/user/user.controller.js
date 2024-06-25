import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name.trim()) {
        return res.status(400).json({
            status: "faild",
            message: "Name is Required",
        });
    }
    if (!email.trim()) {
        return res.status(400).json({
            status: "faild",
            message: "Email is Required",
        });
    }
    if (!password.trim()) {
        return res.status(400).json({
            status: "faild",
            message: "Password is Required",
        });
    }
    const isMatch = await userModel.findOne({ email });
    if (isMatch) {
        return res
            .status(400)
            .json({ status: "faild", message: "Email Is Already Exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND);
    const addUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
    });
    return res.status(201).json({ status: "Success", addUser });
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res
            .status(400)
            .json({ status: "faild", message: "email is required" });
    }
    if (!password) {
        return res
            .status(400)
            .json({ status: "faild", message: "password is required" });
    }
    const isFound = await userModel.findOne({ email });
    if (!isFound) {
        return res
            .status(400)
            .json({ status: "faild", message: "Email Not Found " });
    }
    const matchPassword = bcrypt.compareSync(password, isFound.password);
    if (!matchPassword) {
        return res.status(400).json({ status: "faild", message: "Wrong Password" });
    }
    const token = jwt.sign(
        { _id: isFound._id, email: isFound.email, name: isFound.name },
        `${process.env.SECRET_KEY}`
    );

    res.status(200).json({ status: "success", token });
};