const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
const log = console.log;
app.use(morgan("tiny"));
app.listen(8000, () => {
  console.log(`app is listening on port : ${PORT}`);
});
