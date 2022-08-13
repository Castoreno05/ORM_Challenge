const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({ include: [Product]}).then(data => {
    res.json(data)}).catch(err => {console.log(err)
      res.sendStatus(500)});
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [Product, {model: Product, through: ProductTag}]
  }).then(data => res.json(data))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("Something went wrong!")
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((data) => res.json(data))
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
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
