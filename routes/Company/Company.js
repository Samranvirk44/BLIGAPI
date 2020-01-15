const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
router.post('/ECompanieslatlng', (req, res, next) => {
    console.log("etntr companies")
    var email = req.body.data.Email
    var user_id = null
    var investment_eq = null
    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    })
        .then(data => {
            if (data.length != 0) {

                // console.log(data)
                user_id = data[0].id
                // console.log("user id id" + user_id)
                models.investors.findAll({
                    attributes: ['mini_eq_require', 'total_investment'],
                    where: {
                        user_id: user_id
                    }
                })
                    .then(data => {
                        // console.log(data)
                        if (data.length != 0) {
                            models.entreprenuers.findAll({
                                attributes: ['id'],
                                where: {
                                    user_id: user_id
                                }
                            })
                                .then(entre => {
                                    if (entre.length != 0) {
                                        console.log("in if")
                                        console.log(entre[0].id)
                                        investment_eq = data[0].mini_eq_require;
                                        let total = data[0].total_investment
                                        console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'company_name', 'company_logo', 'investment_req'],
                                            where: {
                                                investment_req: { [Op.lt]: total },
                                                entre_id: { [Op.ne]: entre[0].id },
                                                investment_req: { [Op.gt]: 0 },

                                                // investment_eq: investment_eq,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //    console.log("data=>",data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully"

                                                    })
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })

                                    }
                                    else {
                                        console.log("in else")
                                        investment_eq = data[0].mini_eq_require;
                                        let total = data[0].total_investment
                                        console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'company_name', 'company_logo', 'investment_req'],
                                            where: {
                                                investment_req: { [Op.lt]: total },
                                                investment_req: { [Op.gt]: 0 },
                                                // investment_eq: investment_eq,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //    console.log("data=>",data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully"

                                                    })
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })

                                    }


                                })
                                .catch(function (err) {
                                    res.status(404)
                                        .json({
                                            Successful: false,
                                            Message: "failed"
                                        })
                                })


                        }
                        else {
                            console.log("try again mini eq is not define by user")
                            res.status(200)
                                .json({
                                    status: 'success',
                                    Message: 'min eq is not exists'
                                });
                        }
                    })



            }
            else {
                console.log("try again with correct email")
                res.status(200)
                    .json({
                        status: 'success',
                        Message: 'Email is not exists'
                    });
            }
        })

})
router.post('/Check_C_Id', (req, res, next) => {
    let reg_num = req.body.data.Reg_No
    let flag = false
    models.company.findAll({
        attributes: ['entre_id', 'id'],
        where: {
            reg_num: reg_num

        }
    })
        .then(data => {
            if (data.length != 0) {
                res.status(200)
                    .json({
                        entre_id: data[0].entre_id,
                        flag: true,
                        Message: 'Successfully',
                        Successful: true
                    });
            } else {
                res.status(200)
                    .json({
                        entre_id: '',
                        flag: false,
                        Message: 'Successfully',
                        Successful: true
                    });
            }

        })
        .catch(function (err) {
            console.log("There is an error", err)
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });

})
router.post('/Company_Escrow_Total', (req, res, next) => {

    let values = [{
        company_id: req.body.data.C_Id,
        status: req.body.data.Status   //Review,Going,Escrow,Available
    }]
    let contracts = []
    models.company_investor.findAll({
        attributes: ['id'],
        where: {
            company_id: values[0].company_id
        }
    })
        .then(data => {
            if (data.length != 0) {
                for (let index = 0; index < data.length; index++) {
                    contracts.push(data[index].id)
                }
                models.contract_payments.findAll({
                    attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
                    where: {
                        c_investor_id: contracts,
                        status: values[0].status
                    }
                })
                    .then(data1 => {
                        //   console.log(JSON.stringify(data1))
                        // console.log(data1.length)
                        if (data1[0].total != null) {
                            res.status(200)
                                .json({
                                    Amount: data1[0].total,
                                    Message: 'Success',
                                    Successful: true
                                })
                        }
                        else {
                            res.status(200)
                                .json({
                                    Amount: 0,
                                    Message: 'Success but there is no payment on this contract',
                                    Successful: true
                                })
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                        console.log("There is an error")
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
                        data: 0,
                        Message: 'Success but there is no contract',
                        Successful: true
                    })
            }
        })
        .catch(function (err) {
            console.log(err)
            console.log("There is an error")
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });

})
router.post('/ECompanies_List_by_kind', (req, res, next) => {
      console.log("etntr===============>",req.body.data.Kinds)
    var email = req.body.data.Email
    var user_id = null
    var investment_eq = null
    let company_cat_id = req.body.data.Kinds
    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    })
        .then(data => {
            if (data.length != 0) {
                // console.log(data)
                user_id = data[0].id
                console.log("user id id" + user_id)

                models.investors.findAll({
                    attributes: ['mini_eq_require', 'total_investment'],
                    where: {
                        user_id: user_id
                    }
                })
                    .then(data => {
                        if (data.length != 0) {
                            models.entreprenuers.findAll({
                                attributes: ['id'],
                                where: {
                                    user_id: user_id
                                }
                            })
                                .then(entre => {
                                    if (entre.length != 0) {

                                        investment_eq = data[0].mini_eq_require
                                        total = data[0].total_investment
                                        //console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name', 'company_desc'],
                                            where: {       //change by samran
                                                investment_req: { [Op.lt]: total },
                                                investment_req: { [Op.gt]: 0 },
                                                entre_id: { [Op.ne]: entre[0].id },
                                                company_cat_id: company_cat_id,
                                                // investment_eq: investment_eq,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //console.log(data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully if"

                                                    })
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })

                                    }
                                    else {
                                        console.log("etntr===============>",company_cat_id)
                                        investment_eq = data[0].mini_eq_require
                                        total = data[0].total_investment
                                        //console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name', 'company_desc'],
                                            where: {       //change by samran
                                                investment_req: { [Op.lt]: total },
                                                investment_req: { [Op.gt]: 0 },
                                                 company_cat_id: company_cat_id,
                                                // investment_eq: investment_eq,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //console.log(data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully else "

                                                    })
                                            })
                                            .catch(function (err) {
                                                console.log(err)
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })
                                    }
                                })
                                .catch(function (err) {
                                    res.status(404)
                                        .json({
                                            Successful: false,
                                            Message: "failed"
                                        })
                                })




                        }
                        else {
                            console.log("investor is not exists")
                            res.status(200)
                                .json({
                                    status: 'success',
                                    message: 'investor is not exists'
                                });
                        }
                    })



            }
            else {
                console.log("try again with correct email")
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Email is not exists'
                    });
            }
        })

})
// router.post('/ECompanieslatlng', (req, res, next) => {
//     console.log("etntr companies")
//     var email = req.body.data.Email
//     var user_id = null
//     var investment_eq = null
//     models.users2.findAll({
//         attributes: ['id'],
//         where: {
//             email: email
//         }
//     })
//         .then(data => {
//             if (data.length != 0) {
//                 // console.log(data)
//                 user_id = data[0].id
//                 // console.log("user id id" + user_id)
//                 models.investors.findAll({
//                     attributes: ['mini_eq_require', 'total_investment'],
//                     where: {
//                         user_id: user_id
//                     }
//                 })
//                     .then(data => {
//                         // console.log(data)
//                         if (data.length != 0) {
//                             investment_eq = data[0].mini_eq_require;
//                             let total = data[0].total_investment
//                             console.log(investment_eq)


//                             models.company.findAll({
//                                 attributes: ['id', 'latitude', 'longitude', 'company_name', 'company_logo', 'investment_req'],
//                                 where: {
//                                     investment_req: { [Op.gt]: total },
//                                     // investment_eq: investment_eq,
//                                     entreprenuer: true
//                                 }
//                             })
//                                 .then(data => {
//                                     //    console.log("data=>",data)
//                                     res.status(200)
//                                         .json({
//                                             data: data,
//                                             Successful: true,
//                                             Message: "get successfully"

//                                         })
//                                 })
//                                 .catch(function (err) {
//                                     res.status(404)
//                                         .json({
//                                             Successful: false,
//                                             Message: "failed"
//                                         })
//                                 })

//                         }
//                         else {
//                             console.log("try again mini eq is not define by user")
//                             res.status(200)
//                                 .json({
//                                     status: 'success',
//                                     message: 'min eq is not exists'
//                                 });
//                         }
//                     })



//             }
//             else {
//                 console.log("try again with correct email")
//                 res.status(200)
//                     .json({
//                         status: 'success',
//                         message: 'Email is not exists'
//                     });
//             }
//         })

// })
router.post('/ECompanies_Detail', (req, res, next) => {
    var id = req.body.data.id
    models.company.findAll({
        attributes: ['id', 'company_logo', 'company_name', 'company_desc', 'country_id', 'last_y_rev', 'next_y_rev', 'state_id', 'city_id', 'reg_num', 'company_cat_id', 'entre_id', 'investment_req', 'investment_eq', 'investment_duration', 'blig_equity', 'file1_attachment', 'file2_attachment', 'video_attachment', 'funding', 'profit', 'loss', 'expenditures', 'marketplace', 'feature'
        ],
        where: {
            id: id
        }
    })
        .then(data => {
            // console.log(data)
            // console.log(data[0].company_name)
            res.status(200)
                .json({
                    data: data,
                    Successful: true,
                    Message: "Successfully"

                })
        })
        .catch(function (err) {
            console.log(err)
            res.status(404)
                .json({
                    Successful: false,
                    Message: "failed"
                })
        })

})
router.post('/ECompanies_List', (req, res, next) => {
    //  console.log("etntr")
    var email = req.body.data.Email
    var user_id = null
    var investment_eq = null
    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    })
        .then(data => {
            if (data.length != 0) {
                // console.log(data)
                user_id = data[0].id
                console.log("user id id" + user_id)

                models.investors.findAll({
                    attributes: ['mini_eq_require', 'total_investment'],
                    where: {
                        user_id: user_id
                    }
                })
                    .then(data => {
                        if (data.length != 0) {
                            models.entreprenuers.findAll({
                                attributes: ['id'],
                                where: {
                                    user_id: user_id
                                }
                            })
                                .then(entre => {
                                    if (entre.length != 0) {

                                        investment_eq = data[0].mini_eq_require
                                        total = data[0].total_investment
                                        //console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name', 'company_desc'],
                                            where: {       //change by samran
                                                investment_req: { [Op.lt]: total },
                                                entre_id: { [Op.ne]: entre[0].id },
                                                investment_req: { [Op.gt]: 0 },
                                                // investment_eq: investment_eq,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //console.log(data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully"

                                                    })
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })

                                    }
                                    else {

                                        investment_eq = data[0].mini_eq_require
                                        total = data[0].total_investment
                                        //console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name', 'company_desc'],
                                            where: {       //change by samran
                                                investment_req: { [Op.lt]: total },
                                                investment_req: { [Op.gt]: 0 },
                                                // investment_eq: investment_eq,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //console.log(data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully"

                                                    })
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })
                                    }
                                })
                                .catch(function (err) {
                                    res.status(404)
                                        .json({
                                            Successful: false,
                                            Message: "failed"
                                        })
                                })




                        }
                        else {
                            console.log("investor is not exists")
                            res.status(200)
                                .json({
                                    status: 'success',
                                    message: 'investor is not exists'
                                });
                        }
                    })



            }
            else {
                console.log("try again with correct email")
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Email is not exists'
                    });
            }
        })

})
// router.post('/ECompanies_List', (req, res, next) => {
//     //  console.log("etntr")
//     var email = req.body.data.Email
//     var user_id = null
//     var investment_eq = null
//     models.users2.findAll({
//         attributes: ['id'],
//         where: {
//             email: email
//         }
//     })
//         .then(data => {
//             if (data.length != 0) {
//                 // console.log(data)
//                 user_id = data[0].id
//                 console.log("user id id" + user_id)

//                 models.investors.findAll({
//                     attributes: ['mini_eq_require','total_investment'],
//                     where: {
//                         user_id: user_id
//                     }
//                 })
//                     .then(data => {
//                         // console.log(data)
//                         if (data.length != 0) {
//                             investment_eq = data[0].mini_eq_require
//                             total=data[0].total_investment
//                             //console.log(investment_eq)
//                             models.company.findAll({
//                                 attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name','company_desc'],
//                                 where: {       //change by samran
//                                      investment_req:{[Op.gt]:total},
//                                    // investment_eq: investment_eq,
//                                     entreprenuer: true
//                                 }
//                             })
//                                 .then(data => {
//                                     //console.log(data)
//                                     res.status(200)
//                                         .json({
//                                             data: data,
//                                             Successful: true,
//                                             Message: "get successfully"

//                                         })
//                                 })
//                                 .catch(function (err) {
//                                     res.status(404)
//                                         .json({
//                                             Successful: false,
//                                             Message: "failed"
//                                         })
//                                 })

//                         }
//                         else {
//                             console.log("try again mini eq is not define by user")
//                             res.status(200)
//                                 .json({
//                                     status: 'success',
//                                     message: 'min eq is not exists'
//                                 });
//                         }
//                     })



//             }
//             else {
//                 console.log("try again with correct email")
//                 res.status(200)
//                     .json({
//                         status: 'success',
//                         message: 'Email is not exists'
//                     });
//             }
//         })

// })
// router.post('/ECompanies_List', (req, res, next) => {
//     //  console.log("etntr")
//     var email = req.body.data.Email
//     var user_id = null
//     var investment_eq = null
//     models.users2.findAll({
//         attributes: ['id'],
//         where: {
//             email: email
//         }
//     })
//         .then(data => {
//             if (data.length != 0) {
//                 // console.log(data)
//                 user_id = data[0].id
//                 console.log("user id id" + user_id)

//                 models.investors.findAll({
//                     attributes: ['mini_eq_require'],
//                     where: {
//                         user_id: user_id
//                     }
//                 })
//                     .then(data => {
//                         // console.log(data)
//                         if (data.length != 0) {
//                             investment_eq = data[0].mini_eq_require
//                             //console.log(investment_eq)
//                             models.company.findAll({
//                                 attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name','company_desc'],
//                                 where: {
//                                     investment_eq: investment_eq,
//                                     entreprenuer: true
//                                 }
//                             })
//                                 .then(data => {
//                                     //console.log(data)
//                                     res.status(200)
//                                         .json({
//                                             data: data,
//                                             Successful: true,
//                                             Message: "get successfully"

//                                         })
//                                 })
//                                 .catch(function (err) {
//                                     res.status(404)
//                                         .json({
//                                             Successful: false,
//                                             Message: "failed"
//                                         })
//                                 })

//                         }
//                         else {
//                             console.log("try again mini eq is not define by user")
//                             res.status(200)
//                                 .json({
//                                     status: 'success',
//                                     message: 'min eq is not exists'
//                                 });
//                         }
//                     })



//             }
//             else {
//                 console.log("try again with correct email")
//                 res.status(200)
//                     .json({
//                         status: 'success',
//                         message: 'Email is not exists'
//                     });
//             }
//         })

// })
// router.post('/ECompanies_byType', (req, res, next) => {

//     console.log("datatypes=>", req.body.data.Types)
//     let companies_id = [];
//     models.entrepreneurcompany.findAll({
//         attributes: ['company_id'],
//         where: {
//             companytype_id: req.body.data.Types
//         }
//     })
//         .then((data) => {
//             console.log("data=>", data.length)
//             if (data.length != 0) {
//                 console.log("running if");
//                 for (let index = 0; index < data.length; index++) {
//                     console.log(data[index].company_id)
//                     companies_id.push(data[index].company_id)
//                 }
//                 //console.log(companies_id)

//                 models.company.findAll({
//                     attributes: ['id', 'company_name', 'company_logo', 'company_cat_id', 'investment_req'],
//                     where: {
//                         id: companies_id
//                     }
//                 })
//                     .then(data => {
//                         res.status(200)
//                             .json({
//                                 data: data,
//                                 Message: 'Successfully',
//                                 Successful: true
//                             });
//                     })

//             }
//             else {
//                 console.log("running ifelse")
//                 res.status(200)
//                     .json({
//                         data: [],
//                         Message: 'Empty list',
//                         Successful: false
//                     })

//             }
//         })
//         .catch(function (err) {
//             res.status(404)
//                 .json({
//                     Message: 'Failed' + err,
//                     Successful: false
//                 })
//         })
// })
router.post('/ECompanies_byType', (req, res, next) => {
    //  console.log("etntr")
    var email = req.body.data.Email
    let Types = req.body.data.Types
    var user_id = null
    var investment_eq = null
    let companies_id = [];

    models.entrepreneurcompany.findAll({
        attributes: ['company_id'],
        where: {
            companytype_id: Types
        }
    })
        .then((data) => {
            console.log("data=>", data.length)
            if (data.length != 0) {
                console.log("running if");
                for (let index = 0; index < data.length; index++) {
                    console.log(data[index].company_id)
                    companies_id.push(data[index].company_id)
                }
                //console.log(companies_id)
                //////copying
                models.users2.findAll({
                    attributes: ['id'],
                    where: {
                        email: email
                    }
                })
                    .then(data => {
                        if (data.length != 0) {
                            // console.log(data)
                            user_id = data[0].id
                            console.log("user id id" + user_id)

                            models.investors.findAll({
                                attributes: ['mini_eq_require', 'total_investment'],
                                where: {
                                    user_id: user_id
                                }
                            })
                                .then(data => {
                                    if (data.length != 0) {
                                        models.entreprenuers.findAll({
                                            attributes: ['id'],
                                            where: {
                                                user_id: user_id
                                            }
                                        })
                                            .then(entre => {
                                                if (entre.length != 0) {

                                                    investment_eq = data[0].mini_eq_require
                                                    total = data[0].total_investment
                                                    //console.log(investment_eq)
                                                    models.company.findAll({
                                                        attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name', 'company_desc'],
                                                        where: {       //change by samran
                                                            investment_req: { [Op.lt]: total },
                                                            investment_req: { [Op.gt]: 0 },
                                                            entre_id: { [Op.ne]: entre[0].id },
                                                            id: companies_id,
                                                            // investment_eq: investment_eq,
                                                            entreprenuer: true
                                                        }
                                                    })
                                                        .then(data => {
                                                            //console.log(data)
                                                            res.status(200)
                                                                .json({
                                                                    data: data,
                                                                    Successful: true,
                                                                    Message: "get successfully"

                                                                })
                                                        })
                                                        .catch(function (err) {
                                                            res.status(404)
                                                                .json({
                                                                    Successful: false,
                                                                    Message: "failed"
                                                                })
                                                        })

                                                }
                                                else {

                                                    investment_eq = data[0].mini_eq_require
                                                    total = data[0].total_investment
                                                    //console.log(investment_eq)
                                                    models.company.findAll({
                                                        attributes: ['id', 'latitude', 'longitude', 'investment_req', 'company_logo', 'company_cat_id', 'company_name', 'company_desc'],
                                                        where: {       //change by samran
                                                            investment_req: { [Op.lt]: total },
                                                            investment_req: { [Op.gt]: 0 },
                                                            id: companies_id,
                                                            // investment_eq: investment_eq,
                                                            entreprenuer: true
                                                        }
                                                    })
                                                        .then(data => {
                                                            //console.log(data)
                                                            res.status(200)
                                                                .json({
                                                                    data: data,
                                                                    Successful: true,
                                                                    Message: "get successfully"

                                                                })
                                                        })
                                                        .catch(function (err) {
                                                            res.status(404)
                                                                .json({
                                                                    Successful: false,
                                                                    Message: "failed"
                                                                })
                                                        })
                                                }
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })




                                    }
                                    else {
                                        console.log("investor is not exists")
                                        res.status(200)
                                            .json({
                                                Successful: false,
                                                Message: 'investor is not exists'
                                            });
                                    }
                                })



                        }
                        else {
                            console.log("try again with correct email")
                            res.status(200)
                                .json({
                                    Successful: false,
                                    Message: 'Email is not exists'
                                });
                        }
                    })



                //////////
            }
            else {
                console.log("running ifelse")
                res.status(200)
                    .json({
                        data: [],
                        Message: 'Empty list',
                        Successful: false
                    })

            }
        })
        .catch(function (err) {
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                })
        })


})
router.post('/ECompanieslatlng_by_kind', (req, res, next) => {
    console.log("etntr companies")
    var email = req.body.data.Email
    var user_id = null
    var investment_eq = null
    let company_cat_id = req.body.data.Kinds

    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    })
        .then(data => {
            if (data.length != 0) {

                // console.log(data)
                user_id = data[0].id
                // console.log("user id id" + user_id)
                models.investors.findAll({
                    attributes: ['mini_eq_require', 'total_investment'],
                    where: {
                        user_id: user_id
                    }
                })
                    .then(data => {
                        // console.log(data)
                        if (data.length != 0) {
                            models.entreprenuers.findAll({
                                attributes: ['id'],
                                where: {
                                    user_id: user_id
                                }
                            })
                                .then(entre => {
                                    if (entre.length != 0) {
                                        console.log("in if")
                                        console.log(entre[0].id)
                                        investment_eq = data[0].mini_eq_require;
                                        let total = data[0].total_investment
                                        console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'company_name', 'company_logo', 'investment_req'],
                                            where: {
                                                investment_req: { [Op.lt]: total },
                                                investment_req: { [Op.gt]: 0 },
                                                entre_id: { [Op.ne]: entre[0].id },
                                                // investment_eq: investment_eq,
                                                company_cat_id: company_cat_id,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //    console.log("data=>",data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully"

                                                    })
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })

                                    }
                                    else {
                                        console.log("in else")
                                        investment_eq = data[0].mini_eq_require;
                                        let total = data[0].total_investment
                                        console.log(investment_eq)
                                        models.company.findAll({
                                            attributes: ['id', 'latitude', 'longitude', 'company_name', 'company_logo', 'investment_req'],
                                            where: {
                                                investment_req: { [Op.gt]: total },
                                                investment_req: { [Op.gt]: 0 },
                                                // investment_eq: investment_eq,
                                                company_cat_id: company_cat_id,
                                                entreprenuer: true
                                            }
                                        })
                                            .then(data => {
                                                //    console.log("data=>",data)
                                                res.status(200)
                                                    .json({
                                                        data: data,
                                                        Successful: true,
                                                        Message: "get successfully"

                                                    })
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })

                                    }


                                })
                                .catch(function (err) {
                                    res.status(404)
                                        .json({
                                            Successful: false,
                                            Message: "failed"
                                        })
                                })


                        }
                        else {
                            console.log("try again mini eq is not define by user")
                            res.status(200)
                                .json({
                                    status: 'success',
                                    message: 'min eq is not exists'
                                });
                        }
                    })



            }
            else {
                console.log("try again with correct email")
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Email is not exists'
                    });
            }
        })

})
router.post('/ECompanieslatlngbyType', (req, res, next) => {
    //  console.log("etntr")
    var email = req.body.data.Email
    var user_id = null
    var investment_eq = null
    let companies_id = [];
    let Types = req.body.data.Types

    models.entrepreneurcompany.findAll({
        attributes: ['company_id'],
        where: {
            companytype_id: Types
        }
    })
        .then((data) => {
            console.log("data=>", data.length)
            if (data.length != 0) {
                console.log("running if");
                for (let index = 0; index < data.length; index++) {
                    console.log(data[index].company_id)
                    companies_id.push(data[index].company_id)
                }
                //console.log(companies_id)
                //////copying
                models.users2.findAll({
                    attributes: ['id'],
                    where: {
                        email: email
                    }
                })
                    .then(data => {
                        if (data.length != 0) {
                            // console.log(data)
                            user_id = data[0].id
                            console.log("user id id" + user_id)

                            models.investors.findAll({
                                attributes: ['mini_eq_require', 'total_investment'],
                                where: {
                                    user_id: user_id
                                }
                            })
                                .then(data => {
                                    if (data.length != 0) {
                                        models.entreprenuers.findAll({
                                            attributes: ['id'],
                                            where: {
                                                user_id: user_id
                                            }
                                        })
                                            .then(entre => {
                                                if (entre.length != 0) {

                                                    investment_eq = data[0].mini_eq_require
                                                    total = data[0].total_investment
                                                    //console.log(investment_eq)
                                                    models.company.findAll({
                                                        attributes: ['id', 'latitude', 'longitude', 'company_name', 'company_logo', 'investment_req'],
                                                        where: {       //change by samran
                                                            investment_req: { [Op.lt]: total },
                                                            investment_req: { [Op.gt]: 0 },
                                                            entre_id: { [Op.ne]: entre[0].id },
                                                            id: companies_id,
                                                            // investment_eq: investment_eq,
                                                            entreprenuer: true
                                                        }
                                                    })
                                                        .then(data => {
                                                            //console.log(data)
                                                            res.status(200)
                                                                .json({
                                                                    data: data,
                                                                    Successful: true,
                                                                    Message: "get successfully"

                                                                })
                                                        })
                                                        .catch(function (err) {
                                                            res.status(404)
                                                                .json({
                                                                    Successful: false,
                                                                    Message: "failed"
                                                                })
                                                        })

                                                }
                                                else {

                                                    investment_eq = data[0].mini_eq_require
                                                    total = data[0].total_investment
                                                    //console.log(investment_eq)
                                                    models.company.findAll({
                                                        attributes: ['id', 'latitude', 'longitude', 'company_name', 'company_logo', 'investment_req'],
                                                        where: {       //change by samran
                                                            investment_req: { [Op.lt]: total },
                                                            investment_req: { [Op.gt]: 0 },
                                                            id: companies_id,
                                                            // investment_eq: investment_eq,
                                                            entreprenuer: true
                                                        }
                                                    })
                                                        .then(data => {
                                                            //console.log(data)
                                                            res.status(200)
                                                                .json({
                                                                    data: data,
                                                                    Successful: true,
                                                                    Message: "get successfully"

                                                                })
                                                        })
                                                        .catch(function (err) {
                                                            res.status(404)
                                                                .json({
                                                                    Successful: false,
                                                                    Message: "failed"
                                                                })
                                                        })
                                                }
                                            })
                                            .catch(function (err) {
                                                res.status(404)
                                                    .json({
                                                        Successful: false,
                                                        Message: "failed"
                                                    })
                                            })




                                    }
                                    else {
                                        console.log("investor is not exists")
                                        res.status(200)
                                            .json({
                                                Successful: false,
                                                Message: 'investor is not exists'
                                            });
                                    }
                                })



                        }
                        else {
                            console.log("try again with correct email")
                            res.status(200)
                                .json({
                                    Successful: false,
                                    Message: 'Email is not exists'
                                });
                        }
                    })

            }
            else {
                console.log("running ifelse")
                res.status(200)
                    .json({
                        data: [],
                        Message: 'Empty list',
                        Successful: false
                    })

            }
        })
        .catch(function (err) {
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                })
        })


})
router.post('/Company_ContractDetail', (req, res, next) => {
    console.log(req.body.data.Contract_Id)
    values = [{
        id: req.body.data.Contract_Id,
    }]
    models.company_investor.findAll({
        attributes: ['contract_number', 'total_investment', 'investment_end', 'investor_id'],
        where: {
            id: values[0].id
        }
    })
        .then(data => {
            if (data.length != 0) {
                console.log("data=>", JSON.stringify(data))
                res.status(200)
                    .json({
                        Data: data,
                        Message: 'Success',
                        Successful: true
                    })
            }
            else {
                res.status(200)
                    .json({
                        Message: 'Success but not data company investor table',
                        Successful: true
                    })
            }
        })
        .catch(function (err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed',
                    Successful: false
                })
        })
})
router.post('/Company_Contract_Stages', (req, res, next) => {
    values = [{
        id: req.body.data.Contract_Id,
    }]

    models.company_investor.findAll({
        attributes: ['id'],
        include: [{ model: models.milestone, require: true, attributes: ['id', 'status', 'project_tittle', 'project_description', 'milestone_start', 'milestone_end', 'amount', 'percentage_equity'] }],
        where: {
            id: values[0].id,
        }
    })
        .then(data => {
            console.log(JSON.stringify(data));
            res.status(200)
                .json({
                    data: data,
                    Message: 'Success',
                    Successful: true
                })
        })
        .catch(function (err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed', err,
                    Successful: false
                })
        })


})
module.exports = router;