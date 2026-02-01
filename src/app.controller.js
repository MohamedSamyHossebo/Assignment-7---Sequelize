import { connectDB, syncTables } from './DB/connection.js'
import './DB/models/index.js'; // Import models to register relationships
import { userRouter } from './modules/index.js'


const bootstrap = async (app, express) => {
    app.use(express.json()); // Parsing Raw Body Data
    await connectDB();
    await syncTables();

    app.use("/users", userRouter);
    

    app.all('/*dummy', (req, res, next) => {
        res.status(404).json({ message: "Route not found" });
    });

};

export default bootstrap;