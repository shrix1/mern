const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const todoModel = require("./model/todo");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB server", err);
    process.exit(1);
  });

app.get("/getInfo", async (req, res) => {
  await todoModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

app.post("/createInfo", async (req, res) => {
  try {
    const newDocument = new todoModel(req.body);
    const result = await newDocument.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to insert document", err);
    next(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`running in port ${process.env.PORT}`);
});
