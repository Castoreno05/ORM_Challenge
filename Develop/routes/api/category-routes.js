const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({ include: [Product] }).then((data) => {
    res.json(data);
  });
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [Category]
  }).then(data => res.json(data))
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong!");
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((data) => res.json(data))
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  }).then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});

module.exports = router;
