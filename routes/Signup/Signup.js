
const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');

router.post('/SignUp', (req, res, next) => {
    console.log("inserting")
    let values = [
        {
            email: req.body.Email,
            password: req.body.Pass,
        },
    ];
    models.users2.findAll({
        where: {
            email: values[0].email,
        }
    })
        .then(users => {
            if (users.length == 0) {
                models.users2.bulkCreate(values)
                    .then(function () {
                        res.status(200)
                            .json({
                                Message: 'Successfully',
                                Successful: true
                            });
                    })
                    .catch(function (err) {
                        res.status(404)
                            .json({
                                Message: 'Failed' + err,
                                Successful: false
                            });
                        //return next(err);
                    });
            }
            else {
                res.status(200)
                    .json({
                        Message: 'Failed, Email already Exist',
                        Successful: false
                    });
              //  console.log('already exist!!!');
            }
        })
        .catch(function (err) {
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
            //return next(err);
        });
})

module.exports = router;