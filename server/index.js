import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import aiReqRoutes from "./routes/aiReqRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/pxrave", aiReqRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from the PixelRave Master");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(9000, () =>
      console.log("Server started on http://localhost:9000")
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
