require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
