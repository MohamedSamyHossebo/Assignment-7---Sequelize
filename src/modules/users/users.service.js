import { userModel } from "../../DB/models/index.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email, !password) {
            return res.status(400).json({ message: "Please provide name, email and password" })
        }
        if (await userModel.findOne({ where: { email } })) {
            return res.status(400).json({ message: "User already exists" })
        }
        const user = await userModel.create({ name, email, password });
        return res.status(201).json({ message: "User created successfully", user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAll({
            paranoid: false
        });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" })
        }
        return res.status(200).json({ message: "Users fetched successfully", users })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "User fetched successfully", user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByPk(id,{paranoid:false });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "User fetched successfully", user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        if (!name && !email && !password && !role) {
            return res.status(400).json({ message: "Please provide at least one field" })
        }
        if (!id) {
            throw new Error("Please provide user id")
        }
        const user = await userModel.findByPk(id, { paranoid: false });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const updatedUser = await user.update({ name, email, password, role });
        return res.status(200).json({ message: "User updated successfully", updatedUser })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}

