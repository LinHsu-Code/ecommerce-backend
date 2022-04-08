const Category = require("../models/category");
const slugify = require("slugify");

const getCategoryList = (categories, parentId = null) => {
  const categoryList = [];
  let filteredCategories;
  if (parentId == null) {
    filteredCategories = categories.filter((el) => el.parentId == undefined);
  } else {
    filteredCategories = categories.filter((el) => el.parentId == parentId);
  }
  for (let filteredCategory of filteredCategories) {
    categoryList.push({
      _id: filteredCategory._id,
      name: filteredCategory.name,
      slug: filteredCategory.slug,
      children: getCategoryList(categories, filteredCategory._id),
    });
  }
  return categoryList;
};

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
    const categoryList = getCategoryList(categories);
    return res.status(200).json({ categoryList });
  });
};
