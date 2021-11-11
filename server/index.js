const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const reviewRoutes = require("./src/routes/review");
const categoryRoutes = require("./src/routes/category");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use(reviewRoutes);
app.use(categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
