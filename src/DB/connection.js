import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./src/Config/.env.secrets" });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export const syncTables = async () => {
    try {
        await sequelize.sync({ force: false, alter: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
};

export { sequelize };