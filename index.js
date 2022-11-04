const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected")).
  catch((err) => {
  console.log(err)
  })

app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is running!")
})