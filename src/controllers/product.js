const Product = require("../models/product");
const slugify = require("slugify");

exports.product_create_post = (req, res) => {
  const { name, price, quantity, description, category } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });
  product.save((err, product) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "create product error", error: err });
    }
    return res.status(201).json({ product });
  });
};

// exports.category_list = (req, res) => {
//   Category.find({}).exec((err, categories) => {
//     if (err) {
//       return res.status(400).json({ message: "get categories error" });
//     }
//     const categoryList = getCategoryList(categories);
//     return res.status(200).json({ categoryList });
//   });
// };

exports.product_list = async (req, res) => {
  // const products = await Product.find({ createdBy: req.user._id })
  const products = await Product.find({})
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
