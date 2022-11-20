import { Product } from "../declarations";
import { dbConn } from "../settings";

export default class ProductModel {
  id?: number;
  title: string;
  price: number;

  constructor(title: string, price: number, id?: number) {
    if (id) this.id = id;
    this.title = title;
    this.price = price;
  }

  create() {
    const query = `INSERT INTO Products(title,price) VALUES('${this.title}',${this.price})`;
    dbConn(query).then((result: any) => {
      console.log(result);
    });
  }

  static delete(id: number) {
    const query = `DELETE FROM Products WHERE id = ${id}`;
    dbConn(query).then((res: any) => {
      console.log(res);
    });
  }
}
