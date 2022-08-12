// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', 
  through: {
    model: Category,
    unique: false
  }
  //as: 'sorted_products'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  through: {
    model: ProductTag,
    unique: false
  }
  //as: 'numbered_products'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  foreignKey: 'tag_id',
  through: {
    model: ProductTag,
    unique: true
  },
  // as: 'tagged_product'
}) 

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
