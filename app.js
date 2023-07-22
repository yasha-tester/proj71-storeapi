require("dotenv").config();
const PORT = process.env.PORT || 4000;
require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productRouter);

// routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // connectDB
    app.listen(PORT, console.log(`everything works, the port is ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
