import path from "path";
import fs from "fs";
import { Cart } from "../declarations";

type CartProduct = { id: string, qty: number};


let p = "";
if(require.main){
  p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );
}


export default class CartModel {
  static addProduct(id: string, productPrice: number) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent: any) => {
      let cart: { products: CartProduct[], totalPrice: number } = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct: CartProduct | null = cart.products[existingProductIndex];
      let updatedProduct: CartProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id: string, productPrice: number) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent.toString()) };
      const product = updatedCart.products.find((prod: CartProduct) => prod.id === id);
      if (!product) {
          return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod: CartProduct) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb: (cart: Cart | null) => any) {
    fs.readFile(p, (err, fileContent: any) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
