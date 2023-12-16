require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { authUser } = require("./basicAuth");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { func } = require("joi");
const { users } = require("./data");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require('path')
const resourceLinks = require('./routes/resourceLinks')

// database connection
connection();

const conn = mongoose.createConnection(process.env.DB);

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("notes");
});

const storage = new GridFsStorage({
  url: process.env.DB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "notes",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/resource-link", resourceLinks);
app.post("/notes", upload.single("file"), (req, res) => {
  res.json({ id: req.file.id });
});

app.get("/notes", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    return res.json(files);
  });
});

app.get("/notes/:notesname", (req, res) => {
  console.log(req.params.notesname);
  gfs.files.findOne({filename: req.params.notesname}, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "file doesn't exit",
      });
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res)
  });
});

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
