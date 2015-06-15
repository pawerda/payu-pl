/**
 * Created by pawerda on 13.06.15.
 */
'use strict';

var request = require('request'),
    extend = require('extend');


var PayU = function (merchant_config, hash_key) {
    this.request_data  = {
            uri: 'https://secure.payu.com/api/v2_1/orders',
            headers: {
                'content-type': 'application/json'
            },
            auth: {}
        };

    this.config = {};

    var merchant_id = typeof merchant_config === 'string' || typeof merchant_config === 'number'? merchant_config: null;
    if(!merchant_id && typeof merchant_config === 'object' && !(merchant_config instanceof Array)){
        this.config = merchant_config;
        merchant_id = merchant_config.merchantPosId;

        if(!hash_key && merchant_config.key) {
            hash_key = merchant_config.key;
            delete this.config.key;
        }

        if(typeof hash_key === 'string'|| merchant_id) this.login(merchant_id, hash_key);
    }
};

PayU.API = {};

PayU.setDefaultMerchant = function(merchant_config, hash_key){
    PayU.API = new PayU(merchant_config, hash_key);
    return PayU.API;
};

PayU.parsePrice = function(float_price){
    var rounded_price = (float_price*100).toFixed(0);
    return parseInt(rounded_price).toString();
};

PayU.prototype.login = function (merchant_id, hash_key) {
    var auth = this.request_data.auth;
    auth.user = merchant_id.toString();
    auth.pass = hash_key.toString();
    this.config.merchantPosId = merchant_id;
};

function makeRequest (request_data, callback){
    function responseCallbackWrap (callback){
        return function(error, response, body){
            var res = { statusCode: response.statusCode };
            if (error) {
                callback(error);
            } else {
                res.body = body.indexOf('{') > -1? JSON.parse(body):body;
                res.statusCode == 302||res.statusCode == 200? callback(null, res): callback(res);
            }
        }
    }
    if(request_data.body) request_data.body = JSON.stringify(request_data.body);
    request(request_data, responseCallbackWrap(callback))
}

PayU.prototype.createOrder = function(order_data, callback){
    var request_data = {
        method: 'POST'
    };
    extend(request_data, this.request_data);
    extend(true, request_data.body = {}, this.config, order_data);
    makeRequest(request_data, callback);

};

PayU.prototype.getOrder = function(order_id, callback){
    var request_data = {
        method: 'GET'
    };
    extend(request_data, this.request_data);
    request_data.uri += '/' + order_id;
    makeRequest(request_data, callback);

};

PayU.prototype.cancelOrder = function(order_id, callback){
    var request_data = {
        method: 'DELETE'
    };
    extend(request_data, this.request_data);
    request_data.uri += '/' + order_id;
    makeRequest(request_data, callback);
};

PayU.prototype.refundOrder = function(order_data, callback){
    var request_data = {
        method: 'POST'
    };
    extend(request_data, this.request_data);
    request_data.body = order_data;
    request_data.uri += '/' + request_data.body.orderId + '/refund';
    makeRequest(request_data, callback);
};

PayU.prototype.changeOrderStatus = function(order_data, callback){
    var request_data = {
        method: 'PUT'
    };
    extend(request_data, this.request_data);
    request_data.body = order_data;
    request_data.uri += '/' + request_data.body.orderId + '/status';
    makeRequest(request_data, callback);
};

module.exports = PayU;

