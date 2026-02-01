import { sequelize } from "../../connection.js";
import { DataTypes } from "sequelize";

const postsModel = sequelize.define(
    "Posts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
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


}, {
    timestamps: true,
    paranoid: true,
}
)

export default postsModel