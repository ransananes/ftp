const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(cors());

// Connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/privateCloudStorage" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo db connected");
  })
  .catch((err) => console.log(err));
app.get('/', (req,res) => {
    res.send("poop");
  });
// Use Routes
app.use("/api/ls", require("./routes/api/ls"));
app.use("/api/addNewFile", require("./routes/api/addNewFile"))
app.use("/api/uploadNewFile", require("./routes/api/uploadNewFile"))

// Serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
