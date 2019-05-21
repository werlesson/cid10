"use strict";

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const schema = new Schema({
  subcat: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  classif: {
    type: String,
    required: false,
    trim: true
  },
  restrsexo: {
    type: String,
    required: false,
    trim: true
  },
  causaobito: {
    type: String,
    required: false,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  descricaoabrev: {
    type: String,
    required: true,
    trim: true
  },
  refer: {
    type: String,
    required: false,
    trim: true
  },
  excluidos: {
    type: String,
    required: false,
    trim: true
  }
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Cid10", schema);
