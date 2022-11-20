import path from "path";
import express, { Application } from "express";
import bodyParser from "body-parser";
import errorController from "./controllers/error";
import adminRouter from "./routes/admin";
import shopRouter from "./routes/shop";
import ProductModel from "./newmodels/products";
import UserModel from "./newmodels/users";

const app: Application = express();

// Templating Engine Settings
app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/admin", adminRouter);
app.use(shopRouter);

// 404 Handler
app.use(errorController);

const dbTest = () => {
  const product = new ProductModel('Nivea Moisturizer', 12.5);
  const user =  new UserModel('Masalaman', 'mas@germa.com');
  user.create();
  product.create();
  UserModel.delete(1);
  ProductModel.delete(3);
};

app.listen(3000, () => {
  dbTest();
  console.log(
    "Your Typescript Express server is running on port 3000 at http://localhost:3000"
  );
});
