// paymentController.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Decimal = require('decimal.js');

const merchantSecret = 'MTQyOTQxMjk2ODIxODA5Njc5MjMzNjU1Njk2MTQ2MjU4NjIwMzQyOA==';

// Function to calculate MD5 hash
function getMd5(input) {
  return crypto.createHash('md5').update(input).digest('hex').toUpperCase();
}

router.put('/calculateHash', (req, res) => {
  const { amount } = req.query;

  const merchantID = '1226537';
  const orderID = Date.now().toString(); // current timestamp as order ID
  const currency = 'LKR';

  const amountFormatted = new Decimal(amount).toFixed(2);
  const hash = getMd5(merchantID + orderID + amountFormatted + currency + getMd5(merchantSecret));

  const paymentDTO = {
    orderId: orderID,
    hash: hash,
    amount: amountFormatted,
  };

  res.json(paymentDTO);
});

module.exports = router;
