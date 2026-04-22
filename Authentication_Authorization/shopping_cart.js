const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());

app.use(session({
  secret: 'cart-secret',
  resave: false,
  saveUninitialized: false
}));


const initCart = (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
};

app.use(initCart);


app.post('/cart/add', (req, res) => {
  const { productId, price, quantity } = req.body;
  req.session.cart.push({ productId, price, quantity });
  res.send("Item added");
});


app.put('/cart/update/:productId', (req, res) => {
  const item = req.session.cart.find(
    i => i.productId === req.params.productId
  );
  if (item) item.quantity = req.body.quantity;
  res.send("Updated");
});

app.delete('/cart/remove/:productId', (req, res) => {
  req.session.cart = req.session.cart.filter(
    i => i.productId !== req.params.productId
  );
  res.send("Removed");
});


app.get('/cart', (req, res) => {
  const total = req.session.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  res.json({ cart: req.session.cart, total });
});

app.listen(3000);