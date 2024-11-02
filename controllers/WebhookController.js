const handleCreateProduct = (req, res) => {
    const productData = req.body;

    // Log the data to confirm it’s received
    console.log('Received product data:', productData);

    // Respond with a success message to Shopify
    res.status(200).send('Webhook received');
};

module.exports = { handleCreateProduct };
