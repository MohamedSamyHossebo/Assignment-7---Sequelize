import express from 'express';
import bootstrap from './src/app.controller.js'
import dotenv from 'dotenv'
dotenv.config({ path: './src/config/.env.secrets' });

const app = express();
const PORT = process.env.PORT

const start = async () => {
    try {
        await bootstrap(app, express);
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();