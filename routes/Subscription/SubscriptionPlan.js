const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');

router.get('/GetSub_Plan', (req, res, next) => {
    //  console.log("Getting data")
    models.subscription.findAll({
        attributes: ['subs_amount']
    })
        .then(function (data) {
            //          console.log("data=>",data)
            if (data.length != 0) {
                res.status(200)
                    .json({
                        Successful: true,
                        status: 'Successfully',
                        data: data,
                    });

            } else {
                res.status(200)
                    .json({
                        Successful: false,
                        status: 'Successfully',
                        data: data,
                    });

            }
            //console.log(data)
        })
        .catch(function (err) {
            // console.log("There is an error")
            res.status(404)
                .json({
                    status: 'Failed',
                });
        });
})
router.post('/User_Subs_Amount', (req, res, next) => {
    let mac = req.body.data.Mac
models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            mac_address: mac,
            status: true
        }
    })
        .then(data => {
            console.log(JSON.stringify(data))
            if (data.length != 0) {
                if (data[0].entrepreneur == true) {

                    console.log("user found")
                    models.users2.findAll({
                        attributes: ['id', 'active'],
                        where: {
                            email: data[0].email,
                           // active: true
                        }
                    })
                        .then(data2 => {
                            if (data2.length != 0) {

                                models.entreprenuers.findAll({
                                    attributes: ['id'],
                                    where: {
                                        user_id: data2[0].id
                                    }
                                })
                                    .then(data5 => {
                                        if (data5.length != 0) {
                                            console.log("user found")
                                            models.user_subscription.findAll({
                                                attributes: ['subscription_id'],
                                                where: {
                                                    user_id: data5[0].id,
                                                     payed: false
                                                }
                                            })
                                                .then(data3 => {
                                                    if (data3.length != 0) {
                                                        console.log("found in user_subscription")
                                                        models.subscription.findAll({
                                                            attributes: ['subs_amount'],
                                                            where: {
                                                                id: data3[0].subscription_id
                                                            }
                                                        })
                                                            .then(data4 => {
                                                                if (data4.length != 0) {
                                                                    res.status(200)
                                                                        .json({
                                                                            Amount: data4[0].subs_amount,
                                                                            status: 'success',
                                                                            Message: 'Successfully',
                                                                            Successful: true
                                                                        });
                                                                }
                                                                else {
                                                                    console.log("Not found in subscriptions table")
                                                                    res.status(200)
                                                                        .json({
                                                                            Message: 'Susscess but Not found in subscriptions table',
                                                                            Successful: false
                                                                        });

                                                                }
                                                            })
                                                            .catch(function (err) {
                                                                console.log("There is an error user is not exists")
                                                                res.status(404)
                                                                    .json({
                                                                        Message: 'Failed' + err,
                                                                        Successful: false
                                                                    });
                                                            });
                                                    }
                                                    else {
                                                        console.log("not found in user subscription")
                                                        res.status(200)
                                                            .json({
                                                                Message: 'Susscess but not found in user subscription',
                                                                Successful: false
                                                            });
                                                    }
                                                })
                                                .catch(function (err) {
                                                    console.log("There is an error user is not exists")
                                                    res.status(404)
                                                        .json({
                                                            Message: 'Failed' + err,
                                                            Successful: false
                                                        });
                                                });
                                        }
                                        else {
                                            console.log("not found into user into entreprenuer table")
                                            res.status(200)
                                                .json({
                                                    Message: 'Susscess but not found into user into entreprenuer table',
                                                    Successful: false
                                                });

                                        }
                                    })

                            }
                            else {
                                console.log("user not find in users table")
                                res.status(200)
                                    .json({
                                        Message: 'Susscess but user not find in users table',
                                        Successful: false
                                    });
                            }
                        })
                        .catch(function (err) {
                            console.log("There is an error user is not exists")
                            res.status(404)
                                .json({
                                    Message: 'Failed' + err,
                                    Successful: false
                                });
                        });
                }
                else {
                    console.log("user is investor")
                    models.users2.findAll({
                        attributes: ['id', 'active'],
                        where: {
                            email: data[0].email,
                          //  active: true
                        }
                    })
                        .then(data2 => {
                            if (data2.length != 0) {

                                models.investors.findAll({
                                    attributes: ['id'],
                                    where: {
                                        user_id: data2[0].id
                                    }
                                })
                                    .then(data5 => {
                                        if (data5.length != 0) {
                                            console.log("user found")
                                            models.user_subscription.findAll({
                                                attributes: ['subscription_id'],
                                                where: {
                                                    user_id: data5[0].id,
                                                     payed: false
                                                }
                                            })
                                                .then(data3 => {
                                                    if (data3.length != 0) {
                                                        console.log("found in user_subscription")
                                                        models.subscription.findAll({
                                                            attributes: ['subs_amount'],
                                                            where: {
                                                                id: data3[0].subscription_id
                                                            }
                                                        })
                                                            .then(data4 => {
                                                                if (data4.length != 0) {
                                                                    res.status(200)
                                                                        .json({
                                                                            Amount: data4[0].subs_amount,
                                                                            status: 'success',
                                                                            Message: 'Successfully',
                                                                            Successful: true
                                                                        });
                                                                }
                                                                else {
                                                                    console.log("Not found in subscriptions table")
                                                                    res.status(200)
                                                                        .json({
                                                                            Message: 'Susscess but Not found in subscriptions table',
                                                                            Successful: false
                                                                        });

                                                                }
                                                            })
                                                            .catch(function (err) {
                                                                console.log("There is an error user is not exists")
                                                                res.status(404)
                                                                    .json({
                                                                        Message: 'Failed' + err,
                                                                        Successful: false
                                                                    });
                                                            });
                                                    }
                                                    else {
                                                        console.log("not found in user subscription")
                                                        res.status(200)
                                                            .json({
                                                                Message: 'Susscess but not found in user subscription',
                                                                Successful: false
                                                            });
                                                    }
                                                })
                                                .catch(function (err) {
                                                    console.log("There is an error user is not exists")
                                                    res.status(404)
                                                        .json({
                                                            Message: 'Failed' + err,
                                                            Successful: false
                                                        });
                                                });
                                        }
                                        else {
                                            console.log("not found into user into investor table")

                                            res.status(200)
                                                .json({
                                                    Message: 'Susscess but not found into user into investor table',
                                                    Successful: false
                                                });
                                        }
                                    })

                            }
                            else {
                                console.log("user not find in users table")
                                res.status(200)
                                    .json({
                                        Message: 'Susscess but user not find in users table',
                                        Successful: false
                                    });
                            }
                        })
                        .catch(function (err) {
                            console.log("There is an error user is not exists")
                            res.status(404)
                                .json({
                                    Message: 'Failed' + err,
                                    Successful: false
                                });
                        });
                }
            }
            else {
                console.log("user not found in session")
                res.status(200)
                    .json({
                        Message: 'Susscess but user not found in session',
                        Successful: false
                    });
            }


        })
        .catch(function (err) {
            console.log("There is an error user is not exists")
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });


})
router.put('/Update_Subs_Amount', (req, res, next) => {
    let user_id = req.body.data.entre_id
    values = [{
        payed: 'true'
    }]

    models.user_subscription.findAll({
        where: {
            user_id: user_id,
            payed: false
        }
    })
        .then(data => {
            if (data.length != 0) {

                models.user_subscription.update({

                    payed: values[0].payed,
                }, {
                        where: {
                            user_id: user_id,
                            payed: false
                        }
                    })
                    .then(function () {
                        res.status(200)
                            .json({
                                Message: 'Successfully',
                                Successful: true
                            });

                    }).catch(function (err) {
                        console.log("There is an error")
                        res.status(404)
                            .json({
                                Message: 'Failed' + err,
                                Successful: false
                            });
                    });


            }
            else {
                console.log("user not found or payed already")
                res.status(200)
                    .json({
                        Message: 'Success but user not found or payed already',
                        Successful: false
                    });
            }


        })
        .catch(function (err) {
            console.log("There is an error")
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });


})
router.post('/Check_Subs', (req, res, next) => {
    models.user_subscription.findAll({
        attributes:['id']},{
        where: {
            user_id: req.body.data.entre_id,
        }
    }).then(data=>{
        if(data.length!=0){
            res.status(200)
            .json({
                Message:'Plan Subscribed',
                Successful:false
            })
        }else{
            res.status(200)
            .json({
                Message:'Plan not Subscribed',
                Successful:true
            })
        }
    }).catch(err=>{
        res.status(404)
        .json({
            Message:'Failed'+err,
            Successful:false
        })
    })
})
module.exports = router;