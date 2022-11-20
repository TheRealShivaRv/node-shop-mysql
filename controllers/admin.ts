import { Request, Response } from "express";
import ProductModel from "../models/product";
import { Product } from "../declarations";

exports.getAddProduct = (req: Request, res: Response) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req: Request, res: Response) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const newProduct = { id: null, title, imageUrl, description, price };
  const product = new ProductModel(newProduct);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req: Request, res: Response) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  ProductModel.findById(prodId, (product: Product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req: Request, res: Response) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedData: Product = {
    id: prodId,
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    description: updatedDesc,
    price: updatedPrice,
  };
  const updatedProduct = new ProductModel(updatedData);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req: Request, res: Response) => {
  ProductModel.fetchAll((products: Product[]) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req: Request, res: Response) => {
  const prodId = req.body.productId;
  ProductModel.deleteById(prodId);
  res.redirect("/admin/products");
};
