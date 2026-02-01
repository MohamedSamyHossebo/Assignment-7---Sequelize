import { sequelize } from "../../connection.js";
import { DataTypes } from "sequelize";

const commentsModel = sequelize.define(
    "Comments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: true,
}
)

export default commentsModel