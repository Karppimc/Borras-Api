const handleCreateProduct = (req, res) => {
    const productData = req.body;
    console.log('Received product data:', productData);
    res.status(200).send('Webhook received');
};

module.exports = { handleCreateProduct };

