"use strict"; // Força a ser mais criterioso: esquecer ; ou ,

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
// const router = express.Router();

// Conecta ao banco
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://cid10api:cid10api@ds040027.mlab.com:40027/cid10", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Carrega models
// const Product = require("./models/product");
const Cid10 = require("./models/cid10");

// Carrega rotas
// const indexRoute = require("./routes/index-route");
// const productRoute = require("./routes/product-route");
const cid10Route = require("./routes/cid10-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", indexRoute);
// app.use("/products", productRoute);
app.use("/", cid10Route);

module.exports = app;
