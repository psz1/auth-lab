const express = require("express");
const cookieParser = require("cookie-parser");

const PORT = 4000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

/**
 * This middleware sets the Access-Control-Allow-Headers header to specify the headers that are allowed in the request.
 *
 * @param {Object} _req - The request object (not used).
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const headersMiddleware = (_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
}

app.use(headersMiddleware);

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
