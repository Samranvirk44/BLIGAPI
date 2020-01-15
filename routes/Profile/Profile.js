const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');
const sequelize=require('sequelize')
router.put('/Profile', (req, res, next) => {
    console.log("user profile creating....")
    models.users2.update(
        {
            profile_pic: req.body.data.profile_pic,
            email: req.body.data.Email
        },
        {
            where: {
                id: req.body.data.id
            }
        })
        .then(() => {
            res.status(200)
                .json({
                    Message: 'Successful',
                    Successful: true
                })
        })
        .catch(function (err) {
            console.log(err)
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });
})
router.post('/Users_Profile', (req, res, next) => {
    var user_ID = req.body.data.u_id
    models.users2.findAll({
        attributes: ['profile_pic', 'first_name', 'email', 'dob', 'country_id', 'created_at', 'Response_time', 'language']
        , where: {
            id: user_ID
        }
    }).then(function (data6) {
        if (data6.length != 0) {
            console.log('profile data:', data6[0].dataValues)
            res.status(200)
                .json({
                    // status: 'success',
                    Message: 'profile data',
                    data: data6,
                    Successful: true
                });
        }
        else {
            res.status(200)
                .json({
                    // status: 'success',
                    Message: 'Empty',
                    data: [],
                    Successful: false
                });
        }


    }).catch(function (err) {
        console.log("There is an error")
        res.status(404)
            .json({
                Message: 'Failed' + err,
                Successful: false
            });
    });
})
router.post('/Investor_TotalInvestment', (req, res, next) => {
    console.log("req id=>", req.body.data.I_id)
    var investor_id = req.body.data.I_id;
    models.investors.findAll({
        attributes: ['business_kind'],
        where: {
            id: investor_id
        }
    }).then(function (data6) {

        if (data6.length != 0) {
            //  console.log('kind:', data5[0].dataValues.business_kind)
            models.company_investor.findAll({
                // attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'total']],
                attributes: [[sequelize.fn('sum', sequelize.col('total_investment')), 'total']],
                where: {
                    investor_id: investor_id,
                    status: ['Going', 'Paid', 'Review', 'Available']
                }
            }).then(function (data5) {
                if (data5.length != 0) {
                    //    console.log('total_investment:', data5[0].dataValues.total)
                    var total_investment = data5[0].dataValues.total
                    res.status(200)
                        .json({
                            Message: 'Successful',
                            data: [{ 'Investment': total_investment, 'Kind': data6[0].dataValues.business_kind }],
                            Successful: true
                        });
                }
                else {
                    res.status(200)
                        .json({
                            Message: 'Empty ',
                            data: [],
                            Successful: false
                        });
                }

            }).catch(function (err) {
                // console.log("There is an error")
                res.status(404)
                    .json({
                        Message: 'Failed' + err,
                        Successful: false
                    });
            });
        }
        else {
            res.status(200)
                .json({
                    status: 'success',
                    Message: 'Empty ',
                    data: [],
                    Successful: false
                });
        }
    }).catch(function (err) {
        //console.log("There is an error")
        res.status(404)
            .json({
                Message: 'Failed' + err,
                Successful: false
            });
    });

})
module.exports = router;