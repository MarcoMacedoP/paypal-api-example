const router = require('express').Router()
const Transaction = require('../controllers/Paypal/Transaction');
const debug = require('debug')('app:api:paypal')

const PURCHASE_UNITS_MOCK = [{
    amount: {
        currency_code: 'USD',
        value: '220.00'
    }
}]



router.post('/make-transaction/', async (req, res) => {
    try {
        const { result } = await new Transaction().make({
            purchaseUnits: PURCHASE_UNITS_MOCK
        })
        debug(result)
        res.status(201).json(result)
    } catch (error) {
        debug(error)
        res.status(500).json({ error })
    }
})

router.post('/capture-transaction/', async (req, res) => {
    debug(req.body)
    const { orderID } = req.body
    try {
        const transaction = await new Transaction().capture({ orderID })
        res.status(201).json({
            transaction
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/completed-transaction/', async (req, res) => {
    const { orderID } = req.body
    try {
        const transaction = await new Transaction().details({ orderID });
        res.status(200).json({
            transaction,
            message: 'transaction completed'
        })
    } catch (error) {
        res.status(500).json({ error })
    }
})



module.exports = router;