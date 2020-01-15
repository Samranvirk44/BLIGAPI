
const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal')

router.post('/LogIn', (req, res, next) => {
  console.log("Validating")
  models.users2.findAll({
    where: {
      email: req.body.Email,
    }
  })
    .then(users => {
      if (users.length == 0) {
        res.status(200)
          .json({
            Message: 'Failed, Email does not exist',
            Successful: false
          });
      }
      else {
        models.users2.findAll({
          where: {
            email: req.body.Email,
            password: req.body.Pass
          }
        })
          .then(users => {
            if (users.length == 0) {
              res.status(200)
                .json({
                  Message: 'Failed, Password are wrong!!',
                  Successful: false
                });
            }
            else {
              res.status(200)
                .json({
                  Message: 'Successfully',
                  Successful: true
                });
            }
          })
          .catch(function (err) {
            res.status(404)
              .json({
                Message: 'Failed' + err,
                Successful: false
              });
          });
      }
    })
    .catch(function (err) {
      res.status(404)
        .json({
          Message: 'Failed' + err,
          Successful: false
        });
    });
})




module.exports = router;