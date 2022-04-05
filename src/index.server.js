const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routers
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin/auth");

const app = express();

// coonect mongodb
var mongoDB = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ymfs8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api", authRouter);
app.use("/api", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
