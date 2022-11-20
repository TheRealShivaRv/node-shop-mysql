import fs from "fs";
import path from "path";
import Cart from "./cart";
import { Product } from "../declarations";

let p = "";
if (require.main) {
  p = path.join(path.dirname(require.main.filename), "data", "products.json");
}

const productNotFoundeError = new Error(
  "Product with the specified id does not exist"
);

const getProductsFromFile = (cb: (products: Product[]) => any) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent.toString()));
    }
  });
};

export default class ProductModel implements Product {
  id: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  // constructor(
  //   id: string,
  //   title: string,
  //   imageUrl: string,
  //   description: string,
  //   price: Number
  // ) {
  //   this.id = id;
  //   this.title = title;
  //   this.imageUrl = imageUrl;
  //   this.description = description;
  //   this.price = price;
  // }

  constructor(product: Product) {
    this.id = product.id; 
    this.title = product.title;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
    this.price = product.price;
  }

  save() {
    getProductsFromFile((products: Product[]) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod: Product) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id: string) {
    getProductsFromFile((products: Product[]) => {
      const product = products.find((prod: Product) => prod.id === id);
      const updatedProducts = products.filter(
        (prod: Product) => prod.id !== id
      );
      if (product) {
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (!err) {
            Cart.deleteProduct(id, product.price);
          }
        });
      } else {
        throw productNotFoundeError;
      }
    });
  }

  static fetchAll(cb: (products: Product[]) => any) {
    getProductsFromFile(cb);
  }

  static findById(id: string, cb: (product: Product) => any) {
    getProductsFromFile((products: Product[]) => {
      const product = products.find((p) => p.id === id);
      if (product) cb(product);
      else throw productNotFoundeError;
    });
  }
}
