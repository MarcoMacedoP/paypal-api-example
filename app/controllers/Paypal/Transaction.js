const paypal = require('@paypal/checkout-server-sdk')
const paypalClient = require('./client')


/** Handles all the transaction process on payments on PayPal.
 * @description PAYPAL WORKFLOW:  
 *  1.  The client generates an order with the method make()
 *  2.  After client approves the transaction the capture() method is called
 *  3.  After that we need to verify the transaction, whe can get the details using the method details(),
 *      and if everything it's fine we call send the items to buyer.
 */
class Transaction {
    make({ purchaseUnits }) {
        const request = new paypal.orders.OrdersCreateRequest()
        request.prefer('return=representation')
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: purchaseUnits
        })
        return paypalClient.client().execute(request)
    }

    capture({ orderId }) {
        const request = new paypal.orders.OrdersCaptureRequest(orderId)
        request.requestBody({})
        return paypalClient.client().execute(request)
    }
    /**
     *  Get the details of a transaction based on his ID.
     */
    details({ orderId }) {
        const request = new paypal.orders.OrdersGetRequest(orderId)
        return paypalClient.client().execute(request)
    }


}

module.exports = Transaction;