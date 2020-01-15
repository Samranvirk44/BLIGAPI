const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal')
router.post('/Create_MarketCompany', (req, res, next) => {
    console.log("..console..", req.body.data)

    let values = req.body.data
    models.company.bulkCreate(values)
        .then((data) => {
            res.status(200)
                .json({
                    id: data[0].id,
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
})
////>>>>>>>>>>>>>>>get_marketplace_featured<<<<<<<<<<<<<<<<<<<<

router.post('/MCompany_Featured', (req, res, next) => {
   
   
    let companytypes = []
    let type_names = []
    let type_names_obj = []

    models.company.findAll({
            attributes: ['company_logo', 'company_name', 'id', 'state_id', 'country_id', 'sales_equity'],
            include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
            where: {
                          feature: req.body.data.feature,
                          marketplace: req.body.data.marketplace
            }
        }).then(function(result) {
            console.log('result=>',JSON.stringify( result))
            if (result.length != 0) {
                for (let index1 = 0; index1 < result.length; index1++) {
                    companytypes = []
                    for (let index = 0; index < result[index1].entrepreneurcompanies.length; index++) {
                        companytypes.push(result[index1].entrepreneurcompanies[index].companytype_id)
                    }
                    models.company_type.findAll({
                            attributes: ['type_name'],
                            where: {
                                id: companytypes
                            }
                        }).then(data => {
                            type_names = []
                            let flag = false;
                            for (let index2 = 0; index2 < data.length; index2++) {
                                type_names.push(data[index2].type_name)
                                if (index2 + 1 == data.length) {
                                    flag = true
                                }
                            }
                            type_names_obj.push(type_names)
                            if (index1 + 1 == result.length && flag == true) {
                                res.status(200)
                                    .json({
                                        data: result,
                                        Company_Types: type_names_obj,
                                        Message: 'Success',
                                        Successful: true
                                    })

                            }
                        })
                        .catch(function(err) {
                            res.status(404)
                                .json({
                                    Message: 'Failed:' + err,
                                    Successful: false
                                })
                        })
                }
            } else {
                res.status(200)
                    .json({
                        Message: 'Empty',
                        Successful: false
                    })
            }
        })
        .catch(function(err) {
            res.status(404)
                .json({
                    Message: 'Failed:' + err,
                    Successful: false
                })
        })
   
 
})
///////////////////////new second
router.post('/MCompany_Featured', (req, res, next) => {


    let companytypes = []
    let type_names = []
    let type_names_obj = []

    models.company.findAll({
        attributes: ['company_logo', 'company_name', 'id', 'state_id', 'country_id', 'sales_equity'],
        include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
        where: {
            feature: req.body.data.feature,
            marketplace: req.body.data.marketplace
        }
    }).then(function (result) {
        console.log('result=>', JSON.stringify(result))
        if (result.length != 0) {
            res.status(200)
                .json({
                    data: result,
                    Message: 'Success',
                    Successful: true
                })
  
        }
    })
        .catch(function (err) {
            res.status(404)
                .json({
                    Message: 'Failed:' + err,
                    Successful: false
                })
        })


})
////////////////////>>get_investors_companies<<////////
router.post('/MCompany_Individual', (req, res, next) => {

    models.company.findAll({
        attributes: ['company_logo', 'company_name', 'id', 'state_id', 'country_id', 'sales_equity'],
        include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
        where: {
            entreprenuer: req.body.data.entrepreneur,
            entre_id: req.body.data.id,
            marketplace: req.body.data.marketplace,
            entreprenuer: req.body.data.entrepreneur
        }
    }).then(function (data) {
        // console.log(data)
        res.status(200)
            .json({
                Message: 'Successful',
                data: data,
                Successful: true
            })

    }).catch(function (err) {
        res.status(404)
            .json({
                Message: 'Failed' + err,
                Successful: false
            });
    })
})
router.post('/Set_Bid', (req, res, next) => {
    console.log(req.body.data)
    let values = req.body.data

    models.bid.bulkCreate(values)
        .then((data) => {
            console.log('bid data', data)
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
            //return next(err);
        });
})
router.post('/Show_Bid', (req, res, next) => {
    console.log(req.body.data.C_Id)
    var company_ID = req.body.data.C_Id
    models.company.findAll({
        attributes: ['company_logo', 'company_name'],
        where: {
            id: company_ID
        }
    }).then(function (data) {

        // var Companydata = data
        models.bid.findAll({
            attributes: ['offer_desc', 'start_date', 'total_price', 'status'],
            where: {
                company_id: company_ID
            }
        }).then(function (data2) {
            //            console.log('data:', data2[0].dataValues)
            res.status(200)
                .json({
                    Message: 'success',
                    data: { CompanyData: data, Biddata: data2 },
                    Successful: true
                })

        }).catch(function (err) {
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });
    }).catch(function (err) {
        res.status(404)
            .json({
                Message: 'Failed' + err,
                Successful: false
            });
    })
})
router.post('/Company_BidShow', (req, res, next) => {
    values = [{
        id: req.body.data.entre_id,
    }]
    user_id = []
    bidders_company = []
    let bidders_company2 = []
    let flag = false

    models.company.findAll({
        attributes: ['id', 'company_logo', 'company_name', 'company_desc', 'investment_req', 'sales_equity'],
        include: [{ model: models.bid, require: true, where: { status: 'Review' } }],
        where: {
            entre_id: values[0].id,
            marketplace: 'true',
            entreprenuer: req.body.data.Ent
        }
    })
        .then(data => {
            console.log("data: ", JSON.stringify(data))
            if (data.length != 0) {
                console.log("number of companies of user in marketplace", data.length)
                for (let index = 0; index < data.length; index++) {
                    if (index + 1 == data.length) {
                        flag = true
                    }
                    let bidders = []
                    console.log('number of bids on company', data[index].id, ': ', data[index].bids.length)
                    if (data[index].bids.length != 0) {
                        bidders_company2.push(data[index])

                        for (let index1 = 0; index1 < data[index].bids.length; index1++) {
                            models.users2.findAll({
                                attributes: ['first_name'],
                                where: {
                                    id: data[index].bids[index1].user_id
                                }
                            })
                                .then(data2 => {
                                    console.log("data loop", JSON.stringify(data2))
                                    bidders.push(data2[0].first_name)
                                    console.log(bidders)
                                    console.log(index + 1, data.length)
                                    if (flag == true & index1 + 1 == data[index].bids.length) {
                                        bidders_company.push(bidders)

                                        console.log("data:", JSON.stringify(bidders_company2))
                                        console.log("Bidders:", bidders_company)
                                        // console.log(data1.length)
                                        res.status(200)
                                            .json({
                                                bid_detail: bidders_company2,
                                                bidder_name: bidders_company,
                                                Message: 'Success',
                                                Successful: true
                                            });
                                    }

                                })

                        }
                    }


                }

            }
            else {
                res.status(200)
                    .json({
                        Message: 'Success',
                        Successful: false
                    })
            }
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
router.post('/Bid_Status', (req, res, next) => {
    let Bid_id = req.body.data.B_Id
    let status = req.body.data.status
    models.bid.update({

        status: status,
    }, {
        where: {
            id: Bid_id,
        }
    })
        .then(() => {
            console.log("mile stone is completed")
            res.status(200)
                .json({
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