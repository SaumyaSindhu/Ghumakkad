import "dotenv/config";
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import { config } from './src/config/config.js';

const PORT = config.PORT || 3000;

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        })
    } catch (err) {
        console.error("Error starting the server:", err.message);
        process.exit(1);
    }
}

startServer();