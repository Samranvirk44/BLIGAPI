const express = require('express');
const router = express.Router()
const models = require('../../Modal/Modal')


router.post('/User_Subscription', (req, res, next) => {
console.log(req.body.data.values)
    var values = req.body.data.values
    models.user_subscription.bulkCreate(values)
        .then(function () {
            res.status(200)
                .json({
                    Message: 'Successfully',
                    Successful: true
                });
            console.log("Entrefre subscribe successfully")
        }).catch(function (err) {
            console.log("There is an error")
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });
})

module.exports = router;