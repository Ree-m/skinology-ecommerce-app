const express = require("express");
const CartItem = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  // // Retrieve the cart items for the current user
  const userId = req.params.userId;
  console.log(
    req.params.userId,
    "req.params.userId and req.body.userId",
    req.body.userId
  );

  const items = await CartItem.find({ userId });
  res.json(items);
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  const { userId, productId, name, brand, price, quantity, image } = req.body;

  try {
    // Find the cart document for the user
    let cart = await CartItem.findOne({ userId });

    // If there is no cart document for the user, create a new one
    if (!cart) {
      cart = new CartItem({ userId, products: [] });
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    // If the product is already in the cart, update its quantity
    if (existingProduct) {
      existingProduct.quantity += quantity;
    }
    // Otherwise, add a new product to the cart
    else {
      cart.products.push({ productId, name, brand, price, quantity, image });
    }

    // Save the updated cart document
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const newQuantity = parseInt(req.body.newQuantity);
  console.log("this is updateCart controller", userId, productId, newQuantity);

  try {
    const cartItem = await CartItem.findOneAndUpdate(
      { userId: userId, "products.productId": productId },
      { $set: { "products.$.quantity": newQuantity } },
      { new: true, upsert: true }
    );
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Remove an item from the cart
exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    console.log(userId, "checking for delete cart", productId);
    // find cart of current user
    const cart = await CartItem.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // find the product to be deleted
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.products.splice(productIndex, 1); //from whatever place my product is delete that one only
    await cart.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
