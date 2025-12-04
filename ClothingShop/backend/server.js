const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'db.json');

// Helper function to read data from db.json
const readDb = async () => {
  const dbData = await fs.promises.readFile(dbPath);
  return JSON.parse(dbData);
};

// Helper function to write data to db.json
const writeDb = async (data) => {
  await fs.promises.writeFile(dbPath, JSON.stringify(data, null, 2));
};

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Products API
app.get('/api/products', async (req, res) => {
  const db = await readDb();
  res.json(db.products);
});

app.get('/api/products/:id', async (req, res) => {
  const db = await readDb();
  const product = db.products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Reviews API
app.get('/api/products/:id/reviews', async (req, res) => {
    const db = await readDb();
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product.reviews);
    } else {
        res.status(404).send('Product not found');
    }
});

app.post('/api/products/:id/reviews', async (req, res) => {
    const db = await readDb();
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        const newReview = { id: Date.now(), ...req.body };
        product.reviews.push(newReview);
        await writeDb(db);
        res.status(201).json(newReview);
    } else {
        res.status(404).send('Product not found');
    }
});

// Cart API
app.get('/api/cart', async (req, res) => {
    const db = await readDb();
    res.json(db.cart);
});

app.post('/api/cart', async (req, res) => {
    const db = await readDb();
    const { productId, size, quantity } = req.body;
    const existingItem = db.cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
        await writeDb(db);
        res.json(existingItem);
    } else {
        const product = db.products.find(p => p.id === productId);
        if (product) {
            const cartItemId = `${productId}-${size}`;
            const cartItem = { ...product, size, quantity, cartItemId };
            db.cart.push(cartItem);
            await writeDb(db);
            res.status(201).json(cartItem);
        } else {
            res.status(404).send('Product not found');
        }
    }
});

app.put('/api/cart/:cartItemId', async (req, res) => {
    const db = await readDb();
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).send('Invalid quantity');
    }

    const cartItem = db.cart.find(item => item.cartItemId === req.params.cartItemId);

    if (cartItem) {
        cartItem.quantity = quantity;
        await writeDb(db);
        res.json(cartItem);
    } else {
        res.status(404).send('Cart item not found');
    }
});

app.delete('/api/cart/:cartItemId', async (req, res) => {
    const db = await readDb();
    const index = db.cart.findIndex(item => item.cartItemId === req.params.cartItemId);

    if (index !== -1) {
        db.cart.splice(index, 1);
        await writeDb(db);
        res.status(204).send();
    } else {
        res.status(404).send('Cart item not found');
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
