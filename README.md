payu-pl
=========

For more info check http://developers.payu.com/pl/restapi.html

# Usage:
```text
$npm install payu-pl
```
#### then:

```javascript
var PayU = require('payu-pl');
```

#### API setup:

Merchant configuration are costant data for your merchant e.g., merchantPosId, notifyUrl or whatever you want to be 
stored.

```javascript

var PayU = require('payu-pl'),
    merchantConfig = {
        merchantPosId: 145227, //test merchant id
        key: '13a980d4f851f3d9a1cfc792fb1f5e50', //test merchant key
        currencyCode: "PLN"
    },
    merchant;

//THEN

merchant = PayU.setDefaultMerchant(merchantConfig); //creating instance for app scope
//merchant == PayU.API;
//merchant instanceof PayU 


//OR

merchant = new PayU(merchantConfig); //local instance
    
```

#### Making requests:

```javascript

//You don't need to pass data that you put in merchant configuration.
var testOrderData = {
    customerIp: "127.0.0.1",
    description: 'Test order',
    totalAmount: PayU.parsePrice(17.99), //or put string value in lowest currency unit
    products: [{
        name: 'Product 1',
        unitPrice: PayU.parsePrice(17.99),
        quantity:1
    }]
};

merchant.createOrder(testOrderData, function(err, response){
    console.log(err, response);
});

```

### Implemented methods

Constructor takes 2 arguments. 
First could be config object or merchantPosId. Second is hashKey (optional, could be passed in config object as **key**)

#### PayU = require('payu-pl')

* PayU.**parsePrice(floatPrice)** - returning parsed string price
* merchant = **new PayU**(configOrMerchantId, optionalHashKey) - new merchant instance 
* merchant = PayU.**setDefaultMerchant(*args)** - setting **new PayU**(*args) as **PayU.API** (avalible in next 
module require in app scope) and returns it.

#### PayU instance (merchant from examples)

* merchant.**login(merchantPosId, hashKey)** - setting merchant id and hash key for auth
* merchant.**createOrder(orderData, cb)** - http://developers.payu.com/pl/restapi.html#creating_new_order_api
* merchant.**getOrder(orderId, cb)** - http://developers.payu.com/pl/restapi.html#retrieving_order_data
* merchant.**cancelOrder(orderId, cb)** - http://developers.payu.com/pl/restapi.html#cancellation
* merchant.**refundOrder(orderData, cb)** - http://developers.payu.com/pl/restapi.html#refunds
* merchant.**changeOrderStatus(orderData, cb)** - http://developers.payu.com/pl/restapi.html#status_update



#### Run test.js
