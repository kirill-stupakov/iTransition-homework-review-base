const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use(require("./src/routes/review"));
app.use(require("./src/routes/category"));
app.use(require("./src/routes/user"));
app.use(require("./src/routes/tag"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
