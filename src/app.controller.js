import { connectDB, syncTables } from './DB/connection.js'
import { AuthRoutes, blogRouter, userRouter } from './modules/index.js'


const bootstrap = async (app, express) => {
    app.use(express.json()); // Parsing Raw Body Data
    // await connectDB();
    // await syncTables();

    app.all('/*dummy', (req, res, next) => {
        res.status(404).json({ message: "Route not found" });
    });

};

export default bootstrap;