const router = require('express').Router()
const Transaction = require('../controllers/Paypal/Transaction');

const PURCHASE_UNITS_MOCK = [{
    amount: {
        currency_code: 'USD',
        value: '220.00'
    }
}]



router.post('/make-transaction/', async (req, res) => {
    try {
        const transaction = await new Transaction.make({
            purchaseUnits: PURCHASE_UNITS_MOCK
        })
        res.status(201).json({
            transaction
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/capture-transaction/', async (req, res) => {
    const { orderId } = req.body
    try {
        const transaction = await new Transaction().capture({ orderId })
        res.status(201).json({
            transaction
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/completed-transaction/', async (req, res) => {
    const { orderId } = req.body
    try {
        const transaction = await new Transaction().details({ orderId });
        res.status(200).json({
            transaction,
            message: 'transaction completed'
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})



module.exports = router;