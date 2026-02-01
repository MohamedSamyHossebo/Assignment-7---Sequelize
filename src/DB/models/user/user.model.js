import { sequelize } from "../../connection.js";
import { DataTypes } from "sequelize";
import { checkPasswordLength, checkNameLength } from "../../../utils/validators.js";

const userModel = sequelize.define(
    "Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: checkNameLength
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: checkPasswordLength
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
    }

}, {
    timestamps: true,
    paranoid: true,
}
)

export default userModel