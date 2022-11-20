import { dbConn } from "../settings";

describe("Database Tests", () => {
  test("2+2 === 4", () => {
    expect(2+2).toBe(5);
  });
  test("Check whether the database returns first 5 products", () => {
    const query = "SELECT * FROM Products";
    dbConn(query).then((res: any) => {
      const rows = res[0];
      expect(typeof rows).toBe(Number);
      expect(rows.length).toBeGreaterThan(4);
      expect(rows.length).toBeLessThan(5);
    });
  });
});
