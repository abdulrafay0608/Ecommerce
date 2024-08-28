import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./MongoDBConfig/connect.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

dotenv.config();
connectDB();
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app routes
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

// rest api
app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce app!");
});

// PORT
app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening on port http://localhost:${process.env.PORT}/`
      .bgMagenta
  );
});
