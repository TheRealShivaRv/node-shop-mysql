import path from "path";
import express, { Application } from "express";
import bodyParser from "body-parser";
import errorController from "./controllers/error";

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController);

app.listen(3000, () => {
    console.log("Your Typescript Express server is running on port 3000 at http://localhost:3000");
});
