const PORT = process.env.PORT ?? 8000;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/dbConnection");
const userRouter = require("./routes/userRoutes");
const webRouter = require("./routes/webRoute");
const productRouter = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/sales", async (req, res) => {
//   try {
//     const sales = await db.query("SELECT * FROM products");
//     res.json(sales.rows);
//   } catch (err) {
//     console.error(err);
//   }
// });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/productsApi", productRouter);
app.use("/api", userRouter);
app.use("/", webRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
