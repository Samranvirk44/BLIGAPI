
const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal')
router.put('/User_Status', (req, res, next) => {


    models.users2.findAll({
        where: {
            id: req.body.data.U_Id
        }
    })
        .then(user_data => {
            if (user_data != 0) {
                models.users2.update({
                    active: true,
                }, {
                        where: {
                            id: req.body.data.U_Id
                        }
                    }).then(s => {

                        if (req.body.data.Type == 'Entrepreneur') {
                            models.entreprenuers.findAll({
                                attributes: ['id'],
                                where: {
                                    user_id: req.body.data.U_Id
                                }
                            })
                                .then(data => {
                                    if (data.length != 0) {
                                        models.entreprenuers.update({
                                            active: true,
                                        }, {
                                                where: {
                                                    user_id: req.body.data.U_Id
                                                }
                                            })
                                            .then(() => {
                                                res.status(200)
                                                    .json({
                                                        Message: 'Active Entrepre',
                                                        Successful: true
                                                    });
                                            })
                                            .catch(err => {
                                                res.json({
                                                    Message: 'Failed !',
                                                    Successful: false
                                                })
                                            })
                                    }
                                    else {

                                        res.status(200)
                                            .json({
                                                Message: 'not found Entreprenuer',
                                                Successful: false
                                            })
                                    }
                                })
                        }
                        else if (req.body.data.Type == 'Investor') {
                            models.investors.findAll({
                                attributes: ['id'],
                                where: {
                                    user_id: req.body.data.U_Id
                                }
                            })
                                .then(data => {
                                    if (data.length != 0) {
                                        models.investors.update({
                                            active: true,
                                        }, {
                                                where: {
                                                    user_id: req.body.data.U_Id
                                                }
                                            })
                                            .then(() => {
                                                res.status(200)
                                                    .json({
                                                        Message: 'Active Investor',
                                                        Successful: true
                                                    });
                                            })
                                            .catch(err => {
                                                res.json({
                                                    Message: 'Failed !',
                                                    Successful: false
                                                })
                                            })
                                    }
                                    else {

                                        res.status(200)
                                            .json({
                                                Message: 'not found Investor',
                                                Successful: false
                                            })
                                    }
                                })
                        }
                        else {
                            res.status(200)
                                .json({
                                    Message: 'not found Entreprenuer and investor',
                                    Successful: false
                                })

                        }
                    }).catch(err => {
                        console.log(err)
                        res.json({
                            Message: 'Failed lol!',
                            Successful: false
                        })
                    })
            }
            else {
                res.json({
                    Message: 'User not found!',
                    Successful: false
                })

            }
        })



})
router.put('/User_Reg', (req, res, next) => {
    console.log("User Registering...")
    let values = req.body.data.values
    models.users2.update({

        first_name: values[0].first_name,
        country_id: values[0].country_id,
        state_id: values[0].state_id,
        city_id: values[0].city_id,
        identity_proof: values[0].identity_proof,
        address_proof: values[0].address_proof,
        latitude: values[0].latitude,
        longitude: values[0].longitude,
        kind_business: values[0].kind_business,
        created_at: values[0].created_at,
        active: values[0].active,
    }, {
            where: {
                email: req.body.data.Email,
            }
        }).then(() => {
            console.log("data updated succesfully")
            res.status(200)
                .json({
                    status: 'success',
                    Message: 'user registered'
                });
        })
        .catch(function (err) {
            console.log(err)
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
            //return next(err);
        });
})


// router.post('/Investor_Reg', (req, res, next) => {
//     console.log("Investor Registration....")
//     var email = req.body.data.Email
//     ////////////user_id from users2///////
//     models.users2.findAll({
//         attributes: ['id'],
//         where: {
//             email: email
//         }
//     })
//         .then(users => {
//             var userid = users[0].id
//             console.log("id", userid)
//             let values = [
//                 {
//                     user_id: userid,
//                     total_investment: req.body.data.values[0].total_investment,
//                     blig_equity: req.body.data.values[0].blig_equity,
//                     mini_eq_require: req.body.data.values[0].mini_eq_require,
//                 }
//             ];
//             models.investors.bulkCreate(values)
//                 .then(() => {
//                     models.investors.findAll({
//                         attributes: ['id'],
//                         where: {
//                             user_id: userid
//                         }
//                     })
//                         .then(data => {
//                             console.log("data=>", data[0].id)
//                             var Investorid = data[0].id;
//                             res.status(200)
//                                 .json({
//                                     id: Investorid,
//                                     Message: 'Successful',
//                                     Successful: true
//                                 })
//                         })
//                 })
//                 .catch(function (err) {
//                     console.log(err)
//                     res.status(404)
//                         .json({
//                             Message: 'Failed' + err,
//                             Successful: false
//                         });
//                     //return next(err);
//                 });
//         }).catch(function (err) {
//             console.log(err)
//             res.status(404)
//                 .json({
//                     Message: 'Failed' + err,
//                     Successful: false
//                 });
//         });
// })
router.post('/Investor_Reg', (req, res, next) => {
    //     console.log("Investor Registration....")
    var email = req.body.data.Email
    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    })
        .then(users => {
            if (users.length != 0) {
                models.investors.findAll({
                    attributes: ['id'],
                    where: {
                        user_id: users[0].id
                    }

                })
                    .then(investor => {
                        var userid = users[0].id
                        console.log("user id id", userid)
                        let values = [
                            {
                                user_id: userid,
                                business_kind: req.body.data.values[0].business_kind,
                                total_investment: req.body.data.values[0].total_investment,
                                blig_equity: 0,
                                mini_eq_require: 0,
                                created_at: req.body.data.values[0].created_at
                            }
                        ];
                        console.log("investors length: ", investor.length)
                        if (investor.length != 0) {
                            console.log("investor id: ", investor[0].id)
                            models.investors.update({
                                user_id: values[0].user_id,
                                total_investment: values[0].total_investment,
                                blig_equity: values[0].blig_equity,
                                mini_eq_require: values[0].mini_eq_require,
                                updated_at: new Date(),
                                business_kind: values[0].business_kind

                            }, {
                                    where: {
                                        id: investor[0].id

                                    }
                                }).then(() => {
                                    res.status(200)
                                        .json({
                                            Message: 'Successfully Update',
                                            Successful: true
                                        });
                                })

                        }
                        else {
                            models.investors.bulkCreate(values)
                                .then(data => {
                                    console.log("data=>", data[0].id)
                                    var Investorid = data[0].id;
                                    res.status(200)
                                        .json({
                                            id: Investorid,
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
                                    //return next(err);
                                });

                        }

                    })
                    .catch(function (err) {
                        console.log(err)
                        res.status(404)
                            .json({
                                Message: 'Failed' + err,
                                Successful: false
                            });
                    });

            }
            else {
                res.status(404)
                    .json({
                        Message: 'Failed user not found from user tble',
                        Successful: false
                    });
            }

        }).catch(function (err) {
            console.log(err)
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });
}
)
router.post('/Entrepreneur_Reg', (req, res, next) => {
    console.log("Entrepreneur Registration....")
    var email = req.body.data.Email
    ////////////user_id///////
    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    })
        .then(users => {
            // console.log("i then")
            var userid = users[0].id
            let values = [
                {
                    user_id: userid,
                   // business_kind: req.body.data.business_kind,
                    created_at: req.body.data.created_at
                }
            ];
            models.entreprenuers.findAll({
                attributes: ['id'],
                where: {
                    user_id: users[0].id
                }
            })
                .then(entrepre => {
                    if (entrepre.length != 0) {
                        console.log("investor id: ", entrepre[0].id)
                        models.entreprenuers.update({
                            user_id: values[0].user_id,
                           // business_kind: values[0].business_kind,
                            updated_at: new Date()
                        }, {
                                where: {
                                    id: entrepre[0].id

                                }
                            }).then(() => {
                                res.status(200)
                                    .json({
                                        id: entrepre[0].id,
                                        Message: 'Successfully Update',
                                        Successful: true
                                    });
                            })

                    }
                    else {
                        models.entreprenuers.bulkCreate(values)
                            .then(data => {
                                // console.log("data=>",data[0].id)
                                var entrepreneurid = data[0].id;
                                res.status(200)
                                    .json({
                                        id: entrepreneurid,
                                        Successful: true,
                                        Message: 'Data insertedsuccessfully'
                                    })

                            }).catch(function (err) {
                                console.log(err)
                                res.status(404)
                                    .json({
                                        Message: 'Failed' + err,
                                        Successful: false
                                    });
                            });
                    }

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
// router.post('/Entrepreneur_Reg', (req, res, next) => {
//     console.log("Entrepreneur Registration....")
//     var email = req.body.data.Email
//     ////////////user_id///////
//     models.users2.findAll({
//         attributes: ['id'],
//         where: {
//             email: email
//         }
//     })
//         .then(users => {
//             // console.log("i then")
//             var userid = users[0].id
//             let values = [
//                 {
//                     user_id: userid,
//                 }
//             ];
//             models.entreprenuers.bulkCreate(values)
//                 .then(() => {
//                     //console.log("userid=>", userid)
//                     models.entreprenuers.findAll({
//                         attributes: ['id'],
//                         where: {
//                             user_id: userid
//                         }
//                     })
//                         .then(data => {
//                             // console.log("data=>",data[0].id)
//                             var entrepreneurid = data[0].id;
//                             res.status(200)
//                                 .json({
//                                     id: entrepreneurid,
//                                     Successful: true,
//                                     Message: 'Data insertedsuccessfully'
//                                 })
//                         })

//                 }).catch(function (err) {
//                     console.log(err)
//                     res.status(404)
//                         .json({
//                             Message: 'Failed' + err,
//                             Successful: false
//                         });
//                 });

//         })
//         .catch(function (err) {
//             console.log(err)
//             res.status(404)
//                 .json({
//                     Message: 'Failed' + err,
//                     Successful: false
//                 });
//         });

// })


module.exports = router;