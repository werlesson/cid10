"use strict";
const mongoose = require("mongoose");
const Cid10 = mongoose.model("Cid10");

exports.get = (req, res, next) => {
  const { page, perPage, subcat } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    sort: { SUBCAT: subcat || "asc" },
    select: "SUBCAT DESCRICAO DESCRABREV"
  };
  Cid10.paginate({}, options)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};
