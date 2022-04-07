const Category = require("../models/category");
const slugify = require("slugify");

exports.category_create_post = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  //console.log(categoryObj);
  const category = new Category(categoryObj);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ message: "create category error" });
    }
    return res.status(201).json({ category });
  });
};

exports.category_list = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({ message: "get categories error" });
    }
    return res.status(200).json({ categories });
  });
};
