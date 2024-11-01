const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const database = require("./database/database");

// Bodyparser Middleware
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {});

// Use Routes
app.use("/api/ls", require("./routes/api/ls"));
app.use("/api/addNewFile", require("./routes/api/newFile/addNewFile"));
app.use("/api/download", require("./routes/api/downloadFile"));

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
