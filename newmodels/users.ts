import { dbConn } from "../settings";

export default class User {
  id?: number;
  name: string;
  email: string;

  constructor(name: string, email: string, id?: number) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  create() {
    const query = `INSERT INTO Users(name,email) VALUES('${this.name}', '${this.email}')`;
    dbConn(query).then((res: any) => {
      console.log(res);
    });
  }

  static delete(id: number) {
    const query = `DELETE FROM Users WHERE id = ${id}`;
    dbConn(query).then((res: any) => {
      console.log(res);
    });
  }
}
