payu-pl
=========

For more info check http://developers.payu.com/pl/restapi.html

#Usage:
```text
$npm install payu-pl
```
####then:

```javascript
var PayU = require('payu-pl');
```

####First step:
######API setup
Merchant configuration are costant data for your merchant e.g., merchantPosId, notifyUrl or whatever you want to be 
stored.

```javascript
var PayU = require('payu-pl'),
    merchant_config = {
        merchantPosId: 145227, //test merchant id
        key: '13a980d4f851f3d9a1cfc792fb1f5e50', //test merchant key
        currencyCode: "PLN"
    },
    merchant;

//THEN
PayU.setDefaultMerchant(merchant_config); //creating default instance for app scope
merchant = PayU.API;

//OR

merchant = new PayU(merchant_config); //local instance
    
```

####Second step:
######Making requests


```javascript

//You don't need to pass data that you put in merchant configuration.
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

merchant.createOrder(test_order_data, function(err, response){
    console.log(err, response);
});

```

###Implemented methods

####PayU (require('payu-pl'))

PayU.**setDefaultMerchant(config)** - setting new PayU(config) as PayU.API (avalible in next module require at app 
scope)

PayU.**parsePrice(float_price)** - returning parsed string price

####PayU instance (merchant from examples)

merchant.**createOrder(order_data, cb)** - [payu docs#creating_new_order_api](http://developers.payu.com/pl/restapi
.html#creating_new_order_api)

merchant.**getOrder(order_id, cb)** - [payu docs#retrieving_order_data](http://developers.payu.com/pl/restapi.html#retrieving_order_data)

merchant.**cancelOrder(order_id, cb)** - [payu docs#cancellation](http://developers.payu.com/pl/restapi.html#cancellation)

merchant.**refundOrder(order_data, cb)** - [payu docs#refunds](http://developers.payu.com/pl/restapi.html#refunds)

merchant.**changeOrderStatus(order_data, cb)** - [payu docs#status_update](http://developers.payu.com/pl/restapi.html#status_update)



####Run test.js
