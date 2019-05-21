"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/cid10-controller");

router.get("/", controller.get);

module.exports = router;
