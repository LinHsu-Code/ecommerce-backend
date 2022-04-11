const Cart = require("../models/cart");
const user = require("../models/user");

// const getCategoryList = (categories, parentId = null) => {
//   const categoryList = [];
//   let filteredCategories;
//   if (parentId == null) {
//     filteredCategories = categories.filter((el) => el.parentId == undefined);
//   } else {
//     filteredCategories = categories.filter((el) => el.parentId == parentId);
//   }
//   for (let filteredCategory of filteredCategories) {
//     categoryList.push({
//       _id: filteredCategory._id,
//       name: filteredCategory.name,
//       slug: filteredCategory.slug,
//       children: getCategoryList(categories, filteredCategory._id),
//     });
//   }
//   return categoryList;
// };

const getMergedCart = (cart, cartObj) => {
  const mergedCart = cart;
  cartObj.cartItems.forEach((newItem) => {
    let existedItemIndex = mergedCart.cartItems.findIndex((item) =>
      item.product.equals(newItem.product)
    );
    if (existedItemIndex !== -1) {
      mergedCart.cartItems[existedItemIndex].quantity += newItem.quantity;
    } else {
      mergedCart.cartItems = [...mergedCart.cartItems, newItem];
    }
  });
  return mergedCart;
};

exports.cart_add_post = (req, res) => {
  const cartObj = new Cart({
    user: req.user._id,
    cartItems: req.body.cartItems,
  });
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "find user's cart error", error: err });
    }
    if (cart) {
      // merge new cartItems and existed cartItems
      const mergedCart = getMergedCart(cart, cartObj);
      cart.save((err, cart) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "existed cart update error", error: err });
        }
        return res.status(201).json({ cart });
      });
    } else {
      cartObj.save((err, cart) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "new user's cart add error", error: err });
        }
        return res.status(201).json({ cart });
      });
    }
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
