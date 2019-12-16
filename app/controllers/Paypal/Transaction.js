const paypal = require('@paypal/checkout-server-sdk')
const paypalClient = require('./client')

class Transaction {
    static async makeRequest({ value, currency }) {
        const request = new paypal.orders.OrdersCreateRequest()
        request.prefer('return=representation')
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency || 'USD',
                    value: value || '220.00'
                }
            }]
        })
        return request
    }
    static make({ value, currency }) {
        const request = this.makeRequest({ value, currency })
        return paypalClient.client().execute(request)
    }


}

module.exports = Transaction;