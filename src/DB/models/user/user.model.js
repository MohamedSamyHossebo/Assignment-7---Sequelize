import { sequelize } from "../../connection.js";
import { DataTypes } from "sequelize";
import { checkPasswordLength, checkNameLength } from "../../../utils/validators.js";

const userModel = sequelize.define(
    "Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: checkNameLength
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
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
    hooks: {
        beforeCreate: (user) => {
            checkNameLength(user.name);
        }
    }
}
)

export default userModel