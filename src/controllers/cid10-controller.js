"use strict";
const mongoose = require("mongoose");
const Cid10 = mongoose.model("Cid10");
const reg = require("../mixin/regexIgnoreAccents");

exports.get = (req, res, next) => {
  const { page, perPage, subcat, search } = req.query;
  let query = {};

  if (typeof search == "string")
    query = {
      $or: [
        { SUBCAT: new RegExp(reg.make_pattern(search), "i") },
        { DESCRICAO: new RegExp(reg.make_pattern(search), "i") }
      ]
    };

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    sort: { SUBCAT: subcat || "asc" },
    select: "SUBCAT DESCRICAO DESCRABREV"
  };

  Cid10.paginate(query, options)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};
