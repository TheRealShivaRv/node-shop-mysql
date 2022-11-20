import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "node_shop",
  rowsAsArray: false
};

export async function dbConn(query: string) {
  try {
    const connection = mysql.createPool(config);
    return connection.execute(query);
  } catch (err: any) {
    console.error(err);
  }
}
