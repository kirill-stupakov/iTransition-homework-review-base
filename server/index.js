const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();

const server = http.createServer(app);

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
