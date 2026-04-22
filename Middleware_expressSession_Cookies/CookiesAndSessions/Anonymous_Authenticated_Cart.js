import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true
}));


app.post("/add-to-cart", (req, res) => {
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  cart.push(req.body.item);
  res.cookie("cart", JSON.stringify(cart));
  res.send("Added to cart");
});


app.post("/login", (req, res) => {
  const cookieCart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  req.session.cart = cookieCart;
  res.clearCookie("cart");
  res.send("Logged in & cart migrated");
});


app.post("/user/cart", (req, res) => {
  req.session.cart = req.session.cart || [];
  req.session.cart.push(req.body.item);
  res.send("Added to session cart");
});