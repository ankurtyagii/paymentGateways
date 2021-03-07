/* eslint linebreak-style: ["error", "windows"] */
const braintree = require('./paymentConfig/braintree');
const stripe = require('./paymentConfig/stripe');

const paymentGateway = (input) => {
  let provider = {};
  switch (input.provider) {
    case 'STRIPE':
      provider = stripe;
      break;

    case 'BRAINTREE':
      provider = braintree;
      break;

    default:
      provider = false;
      break;
  }
  return provider;
};

module.exports = {
  paymentGateway,
};
