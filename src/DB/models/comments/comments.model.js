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
        references: {
            model: "Users",
            key: "id"
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Posts",
            key: "id"
        }
    }


}, {
    timestamps: true,
}
)

export default commentsModel