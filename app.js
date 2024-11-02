require('dotenv').config();
const express = require('express');
const app = express();
const { handleCreateProduct } = require('./controllers/WebhookController');
const { fetchProductStockByEAN } = require('./controllers/WholesalerController');

// Middleware to parse JSON
app.use(express.json());

// Sample route to test the server
app.get('/', (req, res) => {
    res.send('Hello, world! The API is running.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Webhook endpoint for Shopify
app.post('/webhook/create-product', handleCreateProduct);

// Route to test fetching from the wholesaler API
app.get('/wholesaler/fetch-product', fetchProductStockByEAN);
