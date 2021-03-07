const braintree = require('braintree');

const logger = require('../logger');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

async function pay(input) {
  return new Promise((resolve, reject) => {
    gateway.transaction.sale({
      amount: input.amount,
      paymentMethodNonce: input.nounce,
      deviceData: '',
      options: {
        submitForSettlement: true,
      },
    }, (err, result) => {
      if (result.success) {
        logger.info(result);
        resolve(result);
      }
      if (err) {
        reject(err);
      }
    });
  });
}

async function reimburse(input) {
  return new Promise((resolve, reject) => {
    gateway.transaction.refund(input.transactionId, (err, result) => {
      if (!result) {
        logger.error(result);
        reject(result);
      }
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  pay,
  reimburse,
};
