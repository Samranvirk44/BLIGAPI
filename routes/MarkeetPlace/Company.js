const express = require('express');
const router = express.Router()
const models = require('../../Modal/Modal')
router.post('/Create_Company', (req, res, next) => {
    console.log("company creating................................")
    let values = req.body.data.values
    models.company.findAll({
            attributes: ['id'],
            where: {
                reg_num: values[0].reg_num,
                entre_id: values[0].entre_id
                    // country_id: values[0].country_id
            }
        })
        .then(data => {
            if (data.length == 0) {

                models.company.bulkCreate(values)
                    .then(function(resdata) {
                        res.status(200)
                            .json({
                                //status: 'success',
                                id: resdata[0].id,
                                Message: 'Successfully',
                                Successful: true
                            });
                        //    console.log("become company successfully")
                    }).catch(function(err) {
                        //  console.log("There is an error")
                        res.status(404)
                            .json({
                                Message: 'Failed' + err,
                                Successful: false
                            });
                    });
            } else {


                models.company.update({

                        reg_num: values[0].reg_num,
                        company_name: values[0].company_name,
                        company_desc: values[0].company_desc,
                        country_id: values[0].country_id,
                        state_id: values[0].state_id,
                        city_id: values[0].city_id,
                        company_cat_id: values[0].company_cat_id, //company kind lion or roar
                        entre_id: values[0].entre_id,
                        investment_req: values[0].investment_req,
                        Loan_Financing: values[0].Loan_Financing, //loan
                        investment_eq: values[0].investment_eq,
                        investment_duration: values[0].investment_duration,
                        blig_equity: values[0].blig_equity,

                        file1_attachment: values[0].file1_attachment,
                        file2_attachment: values[0].file2_attachment,
                        video_attachment: values[0].video_attachment,

                        marketplace: values[0].marketplace,
                        feature: values[0].feature,
                        entreprenuer: values[0].entreprenuer,
                        status: values[0].status, //after add the status
                        created_at: values[0].created_at,

                        funding: values[0].funding,
                        longitude: values[0].longitude,
                        latitude: values[0].latitude,
                        updated_at: new Date()
                    }, {
                        where: {
                            reg_num: values[0].reg_num,
                            entre_id: values[0].entre_id
                                //  country_id: values[0].country_id
                        }
                    }).then((resdata1) => {
                        res.status(200)
                            .json({
                                //status: 'success',
                                id: data[0].id,
                                Message: 'Successfully',
                                Successful: true
                            });
                    })
                    .catch(function(err) {
                        console.log("There is an error")
                        res.status(404)
                            .json({
                                Message: 'Failed' + err,
                                Successful: false
                            });
                    });
            }
        })
        .catch(function(err) {
            console.log("There is an error",err)
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });
})

router.post('/ECompanyServices', (req, res, next) => {
    console.log("entrepreneur_companyservices creating....")
    console.log("sercives index", req.body.data)
    let values = []
    for (let index = 0; index < req.body.data.Services.length; index++) {
        values.push({ company_id: req.body.data.C_Id, service_id: req.body.data.Services[index] })
    }

    models.entrepreneurservices.destroy({ where: { company_id: req.body.data.C_Id } })
        .then(() => {
            models.entrepreneurservices.bulkCreate(values)
                .then(() => {
                    res.status(200)
                        .json({
                            Message: 'Successful',
                            Successful: true
                        })
                })
                .catch(function(err) {
                    console.log(err)
                    res.status(404)
                        .json({
                            Message: 'Failed' + err,
                            Successful: false
                        });
                });

        })
        .catch(function(err) {
            console.log(err)
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });



})
router.post('/E_RG_Company', (req, res, next) => {

    let entre_id = req.body.data.entre_id;
    models.entreprenuers.findAll({
        where: {
            id: entre_id
        }
    }).then((entredata) => {

        models.company.findOne({
                attributes: ['id', 'reg_num', 'company_desc', 'video_attachment', 'blig_equity', 'investment_duration', 'Loan_Financing', 'file1_attachment', 'file2_attachment', 'company_name', 'investment_req', 'investment_eq', 'company_cat_id', 'company_logo', 'created_at'],
                include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
                where: {
                    //  id: company_id,
                    entre_id: entre_id
                }
            })
            .then(data => {

                models.company.findOne({
                        attributes: ['id'],
                        include: [{ model: models.entrepreneurservices, required: true, attributes: ['company_id', 'service_id'] }],
                        where: {
                            //id: company_id,
                            entre_id: entre_id
                        }
                    })
                    .then(data1 => {

                        // console.log(JSON.stringify(data))
                        // console.log(JSON.stringify(data1))
                        res.status(200)
                            .json({
                                E_data: entredata,
                                company_Types: data,
                                Services: data1,
                                Successful: true,
                                Message: 'Data insertedsuccessfully'
                            })
                    })
            })
            .catch(function(err) {
                console.log(err)
                res.status(404)
                    .json({
                        Message: 'Failed' + err,
                        Successful: false
                    });
            });
    }).catch(err => {
        console.log(err)
        res.status(404)
            .json({
                Message: 'Failed' + err,
                Successful: false
            });
    })

})
router.post('/ECompanyTypes', (req, res, next) => {
    console.log("entre_companytype creating....", req.body.data.Types)

    let values = []
    for (let index = 0; index < req.body.data.Types.length; index++) {
        values.push({ company_id: req.body.data.C_Id, companytype_id: req.body.data.Types[index] })
    }

    models.entrepreneurcompany.destroy({ where: { company_id: req.body.data.C_Id } })
        .then(() => {

            models.entrepreneurcompany.bulkCreate(values)
                .then(() => {
                    res.status(200)
                        .json({
                            Message: 'Successful',
                            Successful: true
                        })
                })
                .catch(function(err) {
                    console.log(err)
                    res.status(404)
                        .json({
                            Message: 'Failed' + err,
                            Successful: false
                        });

                });

        })

})

router.post('/MCompanyTypes', (req, res, next) => {
    console.log("entre_companytype creating....", req.body.data.Types)
        ////////////user_id from users2///////
    var companyid = req.body.data.id
        //     console.log("id",companyid)
    let values = []
    for (let index = 0; index < req.body.data.Types.length; index++) {
        values.push({ company_id: companyid, companytype_id: req.body.data.Types[index] })
    }
    models.entrepreneurcompany.bulkCreate(values)
        .then(() => {
            res.status(200)
                .json({
                    Message: 'Successful',
                    Successful: true
                })
        })
        .catch(function(err) {
            console.log(err)
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
            //return next(err);
        });


})
router.post('/Mcompany_Detail', (req, res, next) => {
    //console.log('from app:id:', req.body.data.company_id)
    var id = req.body.data.Company_Id
    models.company.findAll({
        attributes: ['company_logo',
            'company_name', 'company_desc', 'state_id',
            'country_id', 'city_id', 'sales_equity', 'expenditures',
            'profit', 'video_attachment', 'last_y_rev', 'next_y_rev',
            'investment_req', 'entre_id', 'entreprenuer'
        ],
        include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
        where: {
            id: id
        }
    }).then(function(data) {
        console.log('Dataa:', data)
        if (data.length != 0) {

            res.status(200)
                .json({
                    Message: 'Successful',
                    data: data[0],
                    Successful: true
                })

        } else {
            console.log('in else')
            res.status(200)
                .json({
                    Message: 'Successful',
                    data: [],
                    Successful: true
                })
        }

    }).catch(function(err) {
        res.status(404)
            .json({
                Message: 'Failed',
                Successful: false
            });
    });

})
router.post('/Company_Contracts_List', (req, res, next) => {
    console.log("company id", req.body.data.Company_Id)
    let company_id = req.body.data.Company_Id;
    let user_data = []
        //let investor_amout=[]

    //let investor_ides=[]

    models.company_investor.findAll({
            attributes: ['id', 'total_investment', 'investor_id', 'investor_equity', 'investment_end', 'status'],
            where: {
                company_id: company_id
            }
        })
        .then(data => {
            if (data != 0) {

                for (let index = 0; index < data.length; index++) {

                    models.investors.findAll({
                            attributes: ['id', 'user_id', ],
                            where: {
                                id: data[index].investor_id
                            }
                        })
                        .then(data1 => {
                            if (data1.length != 0) {
                                models.users2.findAll({
                                        attributes: ['first_name', 'profile_pic'],
                                        where: {
                                            id: data1[0].user_id
                                        }
                                    })
                                    .then(data2 => {
                                        let flag = false
                                        if (data2.length != 0) {
                                            user_data.push(data2[0].first_name)

                                            for (let index2 = 0; index2 < data2.length; index2++) {
                                                flag = true
                                            }
                                            if (index + 1 == data.length && flag == true) {
                                                res.status(200)
                                                    .json({
                                                        contracts_detail: data,
                                                        Investors: user_data,
                                                        Message: 'success',
                                                        Successful: true
                                                    })
                                            }
                                        } else {
                                            res.status(200)
                                                .json({
                                                    Message: 'There is contract and investor exists but not user exits',
                                                    Successful: false
                                                })
                                        }
                                    })
                                    .catch(function(err) {
                                        res.status(404)
                                            .json({
                                                Message: 'Failed',
                                                err,
                                                Successful: false
                                            })
                                    })
                            } else {
                                res.status(200)
                                    .json({
                                        Message: 'There is contract but not investor exists',
                                        Successful: false
                                    })
                            }
                        })
                        .catch(function(err) {
                            res.status(404)
                                .json({
                                    Message: 'Failed',
                                    err,
                                    Successful: false
                                })
                        })

                }
            } else {
                res.status(200)
                    .json({
                        Message: 'There is no contract for this company',
                        Successful: false
                    })
            }

        })
        .catch(function(err) {
            res.status(404)
                .json({
                    Message: 'Failed',
                    err,
                    Successful: false
                })
        })
})
module.exports = router;