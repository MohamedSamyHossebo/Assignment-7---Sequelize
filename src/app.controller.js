import { connectDB, syncTables } from './DB/connection.js'
import './DB/models/index.js'; // Import models to register relationships
import { userRouter,postsRouter,commentsRouter } from './modules/index.js'


const bootstrap = async (app, express) => {
    app.use(express.json()); // Parsing Raw Body Data
    await connectDB();
    await syncTables();

    app.use("/users", userRouter);
    app.use("/posts", postsRouter);
    app.use("/comments", commentsRouter);

    app.all('/*dummy', (req, res, next) => {
        res.status(404).json({ message: "Route not found" });
    });

};

export default bootstrap;