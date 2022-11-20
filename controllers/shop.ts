import { Request, Response } from "express";
import ProductModel from "../models/product";
import CartModel from "../models/cart";
import { Product, Cart, CartProduct } from "../declarations";

export const getProducts = (req: Request, res: Response) => {
  ProductModel.fetchAll((products: Product[]) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

export const getProduct = (req: Request, res: Response) => {
  const prodId = req.params.productId;
  ProductModel.findById(prodId, (product: Product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

export const getIndex = (req: Request, res: Response) => {
  ProductModel.fetchAll((products: Product[]) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

export const getCart = (req: Request, res: Response) => {
  CartModel.getCart((cart: Cart | null) => {
    if(cart){
    ProductModel.fetchAll((products: Product[]) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod: CartProduct) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  } else {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: [],
    });
  }
})
};

export const postCart = (req: Request, res: Response) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product: Product) => {
    CartModel.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

export const postCartDeleteProduct = (req: Request, res: Response) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product: Product) => {
    CartModel.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

export const getOrders = (req: Request, res: Response) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

export const getCheckout = (req: Request, res: Response) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
