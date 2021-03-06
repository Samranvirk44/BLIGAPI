
const stripe = require("stripe")("sk_test_Z6Enxf5PgmQsWNQpOks1glIs00yXgmityu");
const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
router.post('/Access_Token', (req, res, next) =>{
  stripe.charges.create(
    {
      amount: req.body.data.amount*100,    //100 is equual to 1
      currency: 'gbp',
      source: req.body.data.token,  //token that is generated by card
      description: req.body.data.description,
    },
    function (err, charge) {
      // asynchronously called
      if (charge != null) {
        res.status(200)
          .json({
            data: charge,
            Message: 'Successful',
            Successful: true
          })
      } else {
        res.status(404)
          .json({
            data: err,
            Message: 'Failed',
            Successful: false
          })
      }
    }
  );
})
router.post('/Create_Token', (req, res, next) => {
  stripe.tokens.create(
    {
      card: {
        number: req.body.data.number,
        exp_month: req.body.data.exmonth,
        exp_year: req.body.data.exyear,
        cvc: req.body.data.cvc,
      },
    },
    function (err, token) {
      if (token != null) {
        res.status(200)
          .json({
            Token: token,
            Message: 'Successful',
            Successful: true
          })
      } else {
        res.status(404)
          .json({
            data: err,
            Message: 'Failed',
            Successful: false
          })
      }
    }
  );

})
//card token retreive data
// stripe.tokens.retrieve(
//     'tok_1FmboPKfmbJj7r1E2jWMsbin',
//     function(err, token) {
//       // asynchronously called
//       console.log(token)
//     }
//   );

//get all customer list
// stripe.customers.list(
//     {limit: 3},
//     function(err, customers) {
//       // asynchronously called
//       console.log(customers)
//     }
//   );

//delete customer

// stripe.customers.del(
//     'cus_GJDLhndj12X84n',
//     function(err, confirmation) {
//       // asynchronously called
//       console.log(confirmation)
//     }
//   );

//retreive customer
// stripe.customers.retrieve(
//     'cus_GJDNWiCDI7kGv6',
//     function(err, customer) {
//       // asynchronously called
//       console.log(customer)
//     }
//   );

//create customer
// stripe.customers.create(
//     {
//         email:'jenny.rosen@example.com',// cus_GJDNWiCDI7kGv6
//       description: 'Customer for jenny.rosen@example.com',
//     },
//     function(err, customer) {
//       // asynchronously called
//       console.log(customer)
//     }
//   );


// stripe.balance.retrieve(function(err, balance) {
//     // asynchronously called
//     console.log(balance)
//   });


// secret key
// (async () => {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1099,
//       currency: 'gbp',
//     });
//     const clientSecret = paymentIntent.client_secret
//     // Pass the client secret to the client

//     console.log(clientSecret)

//   })();

module.exports = router;

