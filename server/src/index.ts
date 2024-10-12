import * as express from "express";
import authRoutes from "./routes/authRoutes";
import router from "./routes/routes";
import { AppDataSource } from "./data-source"; // Your TypeORM setup

const app = express();
app.use(express.json()); // To parse JSON bodies

AppDataSource.initialize()
  .then(async () => {
    console.log("Data source has been initialized");

    app.use("/api/auth", authRoutes);
    app.use("/api", router);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization", error)
  );
