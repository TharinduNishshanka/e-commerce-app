const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

const products = [
    { id: 1, name: 'Blue Backpack', description: 'Material: Durable synthetic leather,Perfect For:School,Work,Travel,Daily use', price : 10.00, image: 'images/bag.jpeg' },
    { id: 2, name: 'Black Leather Dress Shoes', description: 'Color: Black,Material: Genuine leather upper, rubber sole,Size Options:[39,40,41,42,43,44]', price: 12, image: 'images/shoes.jpeg' },
    { id: 3, name: 'Classic Black T-Shirt', description: 'Color: Black,Material: 100% Cotton,Size Options:[S, M, L, XL, XXL]', price: 7, image: 'images/tshirt.jpg' },
  ];

let cart = [];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get cart items
app.get('/api/cart', (req, res) => {
  const cartWithTotal = cart.map(item => ({
    ...item,
    totalPrice: item.quantity * item.product.price
  }));
  res.json(cartWithTotal);
});

// Add item to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    res.status(200).json({ message: 'Item added to cart' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Update cart item
app.put('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity = quantity;
    res.status(200).json({ message: 'Cart updated' });
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// Remove item from cart
app.delete('/api/cart', (req, res) => {
  const { productId } = req.body;
  cart = cart.filter(item => item.product.id !== productId);
  res.status(200).json({ message: 'Item removed from cart' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
