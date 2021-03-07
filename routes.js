/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-prototype-builtins */
const express = require('express');
const handler = require('./handler');
const logger = require('./logger');

const router = express.Router();
const messages = require('./responseMessages');

router.post('/pay', async (req, res) => {
  let initiatePayment = {};
  try {
    const userInput = req.body;

    const paymentActions = handler.paymentGateway(userInput);
    logger.info(paymentActions);

    if (!paymentActions || !paymentActions.hasOwnProperty('pay')) {
      return res.status(messages.ERROR_CODE).send(messages.PAYMENT_NOT_AVAILABLE);
    }
    // Initiate Payment
    initiatePayment = await paymentActions.pay(userInput);
    logger.info(initiatePayment);

    return res.send({ data: initiatePayment });
  } catch (error) {
    return res.status(messages.ERROR_CODE).send(messages.PAYMENT_ERROR);
  }
});

router.post('/reimburse', async (req, res) => {
  let initiateReimbursement = {};
  try {
    const userInput = req.body;
    const paymentActions = handler.paymentGateway(userInput);

    if (!paymentActions || !paymentActions.hasOwnProperty('reimburse')) {
      return res.status(messages.ERROR_CODE).send(messages.PAYMENT_REFUND_NOT_AVAILABLE);
    }
    //   Initiate Refund/Reimbursement
    initiateReimbursement = await paymentActions.reimburse(userInput);
    logger.info(initiateReimbursement);

    if (!initiateReimbursement) {
      throw initiateReimbursement;
    }
    return res.send(messages.REFUND_SUCCESS);
  } catch (error) {
    return res.status(messages.ERROR_CODE).send(messages.REFUND_ERROR);
  }
});

router.post('/cancel', async (req, res) => {
  try {
    let initiateCancel = {};
    const userInput = req.body;
    const paymentActions = handler.paymentGateway(userInput);
    if (!paymentActions || !paymentActions.hasOwnProperty('cancel')) {
      return res.status(messages.ERROR_CODE).send(messages.CANCEL_NOT_AVAILABLE);
    }
    initiateCancel = await paymentActions.cancel(userInput);
    if (!initiateCancel) {
      throw initiateCancel;
    }
    return res.send(messages.PAYMENT_CANCEL_SUCCESS);
  } catch (error) {
    return res.status(messages.ERROR_CODE).send(messages.PAYMENT_CANCEL_ERROR);
  }
});

module.exports = router;
