const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const logger = require('../logger');

function pay(input) {
  return new Promise((resolve, reject) => {
    try {
      stripe.customers.create({
        email: input.email,
        source: input.stripeToken,
        name: input.name,
      }, (err, result) => {
        if (result) {
          logger.info(result);

          //    Charge customer
          stripe.charges.create({
            amount: input.amount,
            description: 'Sample Charge',
            currency: 'usd',
            customer: result.id,
          });
          //    Return charge status
          resolve(result);
        }
        if (err) {
          logger.error(err);
          reject(err);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function reimburse(input) {
  return new Promise((resolve, reject) => {
    try {
      logger.info(input);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

function cancel(input) {
  return new Promise((resolve, reject) => {
    try {
      logger.info(input);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  pay,
  reimburse,
  cancel,
};
