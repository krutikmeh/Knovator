const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./model/index");

const dotenv = require('dotenv');
dotenv.config();

const routes = require('./routes/app.routes');

app.use('/', routes)
app.get("/", (req, res) => {
    res.json({ message: "Hello World !!!" });
  });

  db.mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });