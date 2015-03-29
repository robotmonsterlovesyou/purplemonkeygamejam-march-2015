define(function (require) {

    'use strict';

    var Order = require('./order');

    function OrderManager() {

        this.orders = [];
        this.orderMax = 3;
        this.activeFruits = [];
    };

    OrderManager.prototype.createOrder = function () {

        var keys = Object.keys(this.orders),
            available = [0, 1, 2];

        for (var key = 0; key < keys.length; key += 1) {
            delete available[keys[key]];
        }

        var availableKeys = Object.keys(available);
        if (availableKeys.length > 0) {
            var newKey = Math.floor(Math.random() * availableKeys.length);
            this.orders[availableKeys[newKey]] = new Order(availableKeys[newKey]);
        }
    };

    OrderManager.prototype._fulfillOrder = function (id) {

        var points = this.orders[id].getPointValue();
console.log('Order ' + id + ' fulfilled! ' + points + ' points');
        delete this.orders[id];
        return points;
    };

    OrderManager.prototype.checkOrders = function (fruits) {

        var keys = Object.keys(this.orders);
        for (var key = 0; key < keys.length; key += 1) {
            if (this.orders[keys[key]].check(fruits)) {
                return this._fulfillOrder(keys[key]);
            }
        }
        return 0;
    };

    OrderManager.prototype.keepOrdersPossible = function () {

        // check active fruits
        // make sure there are active fruits for the current orders
    }

    OrderManager.prototype.beforeTruckDraw = function (stage, truckOffset) {

        var offset = { y: truckOffset },
            keys = Object.keys(this.orders);

        for (var key = 0; key < keys.length; key += 1) {
            this.orders[keys[key]].beforeTruckDraw(stage, offset);
        }
    };

    OrderManager.prototype.afterTruckDraw = function (stage, truckOffset) {

        var offset = { y: truckOffset },
            keys = Object.keys(this.orders);

        for (var key = 0; key < keys.length; key += 1) {
            this.orders[keys[key]].afterTruckDraw(stage, offset);
        }
    };

    return OrderManager;
});
