const mongoose = require("mongoose");

// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/groc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("connected to db done..")).catch((err) => console.log(err));