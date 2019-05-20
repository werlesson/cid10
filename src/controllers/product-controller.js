"use strict";
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validator/fluent-validator");

exports.get = (req, res, next) => {
  Product.find({ active: true }, "title price slug")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.getBySlug = (req, res, next) => {
  Product.findOne(
    { slug: req.params.slug, active: true },
    "title description price tags"
  )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.getByTag = (req, res, next) => {
  Product.find(
    { tags: req.params.tag, active: true },
    "title description price tags"
  )
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

exports.post = (req, res, next) => {
  let product = new Product(req.body);
  product
    .save()
    .then(result => {
      res.status(201).send({
        message: "Produto cadastrado com sucesso!"
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Falha ao cadastrar o produto!",
        data: err
      });
    });
};

exports.put = (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "A description deve conter pelo menos 3 caracteres"
  );

  if (!contract.isValid()) {
    res
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug
    }
  })
    .then(result => {
      res.status(201).send({
        message: "Produto atualizado com sucesso!"
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Falha ao atualizar o produto!",
        data: err
      });
    });
};

exports.delete = (req, res, next) => {
  Product.findOneAndRemove(req.body.id)
    .then(result => {
      res.status(201).send({
        message: "Produto removido com sucesso!"
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Falha ao remover o produto!",
        data: err
      });
    });
};
