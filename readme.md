# Files List with responsibilities

1] app.js - To start the server and incude routes  
2] handler.js - Handles logic for returning the payment gateway which is requested in the user input  
3] logger.js - Handles the logging logic  
4] routes.js - The payment endpoints are defined here, "/payment", "reimburse" and "/cancel".  
5] responseMessages.js - Includes the constants which are used in "routes.js"  
6] Directory paymentConfig - Includes the different payment gateway implementation files  


# Steps to follow to run the project

1] Download the project on your computer.  
2] Run "npm install"  
3] Run npm start  
4] Add/Update payment related keys in ".env"  
4] Hit the endpoints for "pay", "reimburse" and "cancel" and check endpoint response.  

# How to add new payment gateway provider to the code 

1] Add a new file in "paymentConfig" directory with the any name, for example - paypal.js

2] In payment gateway file (paypal.js), add implementation for "pay()" and "reimburse()" along with any other method required.

3] Now import the payment gateway file in handler.js after Line 3, for example 
    
    const paypal = require('./paymentConfig/paypal')

4] Now in handler.js, add a new case in paymentGateway() method with new Payment Gateway name which is declared on top, example - 
    

    case 'PAYPAL':
      provider = paypal;
      break;

5] Include this payment gateway provider key in user input to use the newly added payment gateway, for example - 

        {"provider":"PAYPAL"}


# Payment Gateway Module Endpoints List

## Endpoint 1] Pay 

**URL: - payment/pay**

**Method - POST**

### Sample Request JSON : 

    (a) For Braintree: { "customerId": 111758148, "amount":"10.00","provider":"BRAINTREE", "nounce":"fake-valid-nonce" }
                     
    Response: 
    {
        "data": {
            "transaction": {
                "id": "5t24tt4j",
                "status": "submitted_for_settlement",
                "type": "sale",
                .................................................other transaction details
            },
            "success": true
        }
    }

    (b) For Stripe: {"provider":"STRIPE", "email":"testsmith@gmail123.com","stripeToken":"tok_visa", "name":"test smith", "amount":"8"}

    Response
    {
        "data": {
            "id": "cus_J4RT2yzGcDEAfe",
            "object": "customer",
            "address": null,
            "balance": 0,
            "created": 1615108057,
            "currency": null,
            "default_source": "card_1ISIaLFImEV873YGwSussYeU",
            "delinquent": false,
            "description": null,
            "discount": null,
            "email": "testsmith@gmail123.com",
            "invoice_prefix": "D1640690",
            "invoice_settings": {
                "custom_fields": null,
                "default_payment_method": null,
                "footer": null
            },
            "livemode": false,
            "metadata": {},
            "name": "test smith",
            "next_invoice_sequence": 1,
            "phone": null,
            "preferred_locales": [],
            "shipping": null,
            "tax_exempt": "none"
        }
    }

## Endpoint 2] Reimburse

**URL: payment/reimburse**

**Method: POST** 

### Sample Request JSON: 

    (a) For Braintree: {"provider":"BRAINTREE", "transactionId":"5t24tt4j"}

    Response:
    {
        "data": "Refund Success"
    }

    {
        "data": "Refund error"
    }


    (b) For STRIPE: {"provider":"STRIPE"}

    {
        "data": "Refund success"
    }

## Endpoint 3] Cancel 

**URL: payment/cancel**

**Method: POST** 

### Sample Request JSON: 

    (a) For Braintree: {"provider":"BRAINTREE"}

    Response:
    {
        "data": "Cancel payment is not available"
    }


    (b) For Stripe: {"provider":"STRIPE"}

    {
        "data": "payment cancellation success"
    }
    
