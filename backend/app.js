const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const MONGODB_URL = "mongodb://127.0.0.1:27017/mestodb";
const handleError = require("./middlewares/handleError");

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3000/users/me", "http://localhost:3001/users/me"], credentials: true }));

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT);
