const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
