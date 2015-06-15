/**
 * check http://developers.payu.com/pl/restapi.html
 * to get to know each method required data
 */

var PayU = require('./'),
    merchant_config = {
        merchantPosId: 145227, //test merchant id
        key: '13a980d4f851f3d9a1cfc792fb1f5e50', //test merchant key
        currencyCode: "PLN"
    };

PayU.setDefaultMerchant(merchant_config); //creating default PayU API instance for app scope

console.log(PayU.API instanceof PayU); //true

var test_order_data = {
    customerIp: "127.0.0.1",
    description: 'Test order',
    totalAmount: PayU.parsePrice(17.99), //or put string value in lowest currency unit
    products: [{
        name: 'Product 1',
        unitPrice: PayU.parsePrice(17.99),
        quantity:1
    }]
};

PayU.API.createOrder(test_order_data, function(err, response){
    console.log(err, response);

    PayU.API.getOrder(response.body.orderId, function(err, response){
        console.log(err, response)
    });

});
