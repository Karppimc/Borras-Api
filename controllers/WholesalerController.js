const axios = require('axios');
const xml2js = require('xml2js');

const fetchProductStockByEAN = async (req, res) => {
    const { ean } = req.query;
    const token = process.env.WHOLESALER_API_TOKEN;

    const xmlBody = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <BasicApiB2BPartners_ProductStockByEAN xmlns="http://CNSApi.pl/webservices/">
                <token>${token}</token>
                <searchString>${ean}</searchString>
            </BasicApiB2BPartners_ProductStockByEAN>
        </soap:Body>
    </soap:Envelope>`;

    try {
        const response = await axios.post('http://89.171.38.14:8886/BasicApiB2BPartners.asmx', xmlBody, {
            headers: { 'Content-Type': 'text/xml; charset=utf-8' }
        });

        // Parse XML response
        xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return res.status(500).send('Error parsing response');
            }

            // Extract heliTwrStock object
            const stockData = result['soap:Envelope']['soap:Body']
                .BasicApiB2BPartners_ProductStockByEANResponse
                .BasicApiB2BPartners_ProductStockByEANResult
                .heliTwrStock;

            if (!stockData) {
                return res.status(404).json({ message: 'No stock data found for the given EAN.' });
            }

            // Send JSON response
            res.status(200).json(stockData);
        });
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).send('Error fetching product data');
    }
};

module.exports = { fetchProductStockByEAN };
