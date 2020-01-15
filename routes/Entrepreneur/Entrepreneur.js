const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');
const sequelize = require('sequelize');
router.post('/Entrepreneur_Contracts', (req, res, next) => {
    console.log(req.body.data.E_Id, req.body.data.Status)
    var entreId = req.body.data.E_Id;
    models.company.findAll({
        attributes: ['id'],
        where: {
            entre_id: entreId,
            entreprenuer: true,
            marketplace: false
        }
    }).then(function(data) {
        if (data.length != 0) {
            let companyID = []
            for (let index = 0; index < data.length; index++) {
                companyID.push(data[index].id)
            }
            let values = [{
                company_id: companyID,
                status: req.body.data.Status
            }]
            models.company_investor.findAll({
                    attributes: ['id', ],
                    where: {
                        company_id: values[0].company_id,
                        status: values[0].status
                    }
                })
                .then(data => {
                    if (data.length != 0) {
                        //console.log(data)
                        // console.log(data.length)
                        res.status(200)
                            .json({
                                Message: 'Ongoing contracts are',
                                data: data.length,
                                Successful: true
                            });
                    } else {
                        res.status(200)
                            .json({
                                data: 0,
                                Message: 'There are no ongoing contracts',
                                Successful: true
                            });
                    }
                })

            .catch(function(err) {
                console.log("There is an error")
                res.status(404)
                    .json({
                        Message: 'Failed' + err,
                        Successful: false
                    });

            })
        } else {
            res.status(404)
                .json({
                    data: 0,
                    Message: 'Empty',
                    Successful: false
                });
        }
    });
})
router.post('/Entrepreneur_TotalInvestment', (req, res, next) => {
    var entre_ID = req.body.data.E_Id;
    models.company.findAll({
        attributes: [
            [sequelize.fn('sum', sequelize.col('investment_req')), 'total']
        ],
        where: {
            entre_id: entre_ID,
            entreprenuer: true
        }
    }).then(function(data6) {
        console.log("data")
        res.status(200)
            .json({
                Message: 'success',
                data: data6,
                Successful: true
            });
    }).catch(function(err) {
        console.log("There is an error")
        res.status(404)
            .json({
                Message: 'Failed' + err,
                Successful: false
            });
    });
})
router.post('/Entrepreneur_CompanyList', (req, res, next) => {
    let entrepreneur_id = req.body.data.E_Id
    let companies_id = []
    models.company.findAll({
            attributes: ['id'],
            where: {
                entre_id: entrepreneur_id,
                entreprenuer: true,
                marketplace: false
            }
        })
        .then(data_company_id => {
            if (data_company_id != 0) {
                // console.log(JSON.stringify(data_company_id));
                for (let index3 = 0; index3 < data_company_id.length; index3++) {
                    companies_id.push(data_company_id[index3].id)
                }
                let companytypes = []
                let type_names = []
                let type_names_obj = []
                let companytype_obj = []
                console.log("Company Id=>", companies_id)
                models.company.findAll({
                        attributes: ['id', 'company_desc', 'company_name', 'investment_req', 'investment_eq', 'company_cat_id', 'company_logo', 'created_at', 'status'],
                        include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
                        where: {
                            id: companies_id
                        }
                    }).then(function(result) {
                        console.log('result=>', result)
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
                                                    ECompanyDetail: result,
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
            } else {
                res.status(200)
                    .json({
                        Message: 'Empty2',
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
router.post('/Proposal', (req, res, next) => {
    console.log(req.body.data)
    let flag = false
    let flag1 = false
    companies_id = []
    entrepreneur_id = req.body.data.E_Id
    investors_name = []
    contracts_id = []
    companies_contracted_name = []
    status = req.body.data.status
    models.company.findAll({
            attributes: ['id'],
            where: {
                entre_id: entrepreneur_id,
                entreprenuer: true
            }
        })
        .then(data => {
            if (data.length != 0) {
                for (let index = 0; index < data.length; index++) {
                    companies_id.push(data[index].id)
                }
                models.company_investor.findAll({
                        attributes: ['investor_id', 'id', 'company_id', 'total_investment', 'investor_equity'],
                        where: {
                            company_id: companies_id,
                            status: status
                        }
                    })
                    .then(data1 => {
                        if (data1.length != 0) {
                            for (let index = 0; index < data1.length; index++) {
                                if (index + 1 == data1.length) {
                                    flag = true
                                }
                                models.company.findAll({
                                        attributes: ['id', 'company_name', 'company_logo'],
                                        where: {
                                            id: [data1[index].company_id]
                                        }
                                    })
                                    .then(data2 => {
                                        companies_contracted_name.push({ name: data2[0].company_name, id: data2[0].id, uri: data2[0].company_logo })
                                    })
                                    .catch(function(err) {
                                        res.status(404)
                                        console.log(err)
                                            .json({
                                                Message: 'Failed',
                                                err,
                                                Successful: false
                                            })
                                    })

                                models.investors.findAll({
                                        attributes: ['user_id', 'id'],
                                        where: {
                                            id: [data1[index].investor_id]
                                        }
                                    })
                                    .then(data3 => {

                                        if (data3.length != 0) {
                                            models.users2.findAll({
                                                    attributes: ['first_name', 'id'],
                                                    where: {
                                                        id: data3[0].user_id
                                                    }
                                                })
                                                .then(data4 => {

                                                    investors_name.push({ name: data4[0].first_name, id: data4[0].id })
                                                    for (let index = 0; index < data4.length; index++) {
                                                        if (index + 1 == data4.length) {
                                                            flag1 = true
                                                        }
                                                    }
                                                    if (index + 1 == data1.length && flag == true && flag1 == true) {
                                                        contracts_id.push(data1[index].id)
                                                        res.status(200)
                                                            .json({
                                                                Contracted_List: data1,
                                                                companies_contracted_name: companies_contracted_name,
                                                                Investors_List: investors_name,
                                                                Message: 'Success',
                                                                Successful: true
                                                            })

                                                    }
                                                })
                                        } else {
                                            console.log("user is not")
                                        }
                                    })
                                    .catch(function(err) {
                                        res.status(404)
                                        console.log(err)
                                            .json({
                                                Message: 'Failed',
                                                err,
                                                Successful: false
                                            })
                                    })
                                console.log("response is here")

                            }
                        } else {
                            console.log(data1)
                            console.log("contracts are not exits")
                            res.status(404)
                                .json({
                                    Message: 'Failed there is no contact in ' + status + ' mode',
                                    Successful: false
                                })
                        }
                    })

            } else {
                res.status(404)
                    .json({
                        Message: 'Failed',
                        Successful: false
                    })
            }

        })
        .catch(function(err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed',
                    err,
                    Successful: false
                })
        })


})
router.post('/Proposal_Detail', (req, res, next) => {
    let contract_id = req.body.data.Contract_Id;
    let company_id = req.body.data.Company_Id;
    models.company.findAll({
            attributes: ['company_name', 'company_cat_id', 'company_logo', 'company_desc'],
            include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
            where: {
                id: company_id
            }
        })
        .then(data => {
            let companytypes_id = []
            for (let index = 0; index < data[0].entrepreneurcompanies.length; index++) {
                companytypes_id.push(data[0].entrepreneurcompanies[index].companytype_id)
            }
            models.company_type.findAll({
                    attributes: ['type_name'],
                    where: {
                        id: companytypes_id
                    }
                })
                .then(data1 => {
                    models.milestone.findAll({
                            attributes: ['id'],
                            where: {
                                c_investor_id: contract_id
                            }
                        })
                        .then(data2 => {
                            models.company_investor.findAll({
                                    attributes: ['total_investment', 'investor_equity'],
                                    where: {
                                        id: contract_id
                                    }
                                })
                                .then(data3 => {
                                    res.status(200)
                                        .json({
                                            contracted_data: data3,
                                            Number_of_mile_stone: data2.length,
                                            Companydata: data,
                                            CompanyTypes: data1,
                                            Message: 'Success',
                                            Successful: true
                                        })
                                })

                        })
                })
        })
})
router.post('/Company_Contracts_Detail', (req, res, next) => {
    let company_id = req.body.data.Company_Id
    let number_milestones = []
    let investor_names = []

    models.company.findAll({
            attributes: ['id', 'company_logo', 'company_name', 'company_desc', 'country_id', 'last_y_rev', 'next_y_rev', 'state_id', 'city_id', 'reg_num', 'company_cat_id', 'entre_id', 'investment_req', 'investment_eq', 'investment_duration', 'blig_equity', 'file1_attachment', 'file2_attachment', 'video_attachment', 'funding', 'profit', 'loss', 'expenditures', 'marketplace', 'feature'],
            include: [{ model: models.entrepreneurcompany, required: true, attributes: ['company_id', 'companytype_id'] }],
            where: {
                id: company_id
            }
        })
        .then(data => {
            if (data.length != 0) {
                companytypes_id = []
                for (let index = 0; index < data[0].entrepreneurcompanies.length; index++) {
                    companytypes_id.push(data[0].entrepreneurcompanies[index].companytype_id)
                }
                models.company_type.findAll({
                        attributes: ['type_name'],
                        where: {
                            id: companytypes_id
                        }
                    })
                    .then(data1 => {
                        if (data1.length) {
                            models.company_investor.findAll({
                                    attributes: ['total_investment', 'investor_id', 'id', 'status'],
                                    include: [{ model: models.milestone, required: true, attributes: ['amount', 'c_investor_id', 'milestone_start', 'milestone_end', 'status', 'percentage_equity'] }],
                                    where: {
                                        company_id: company_id,
                                        status: 'Going'
                                    }
                                })
                                .then(data2 => {
                                    if (data2.length != 0) {
                                        for (let index = 0; index < data2.length; index++) {
                                            number_milestones.push(data2[index].milestones)
                                            a = data2[index].investor_id
                                            models.investors.findAll({
                                                    attributes: ['user_id'],
                                                    where: {
                                                        id: a
                                                    }
                                                })
                                                .then(data3 => {
                                                    if (data3 != 0) {
                                                        models.users2.findAll({
                                                                attributes: ['first_name'],
                                                                where: {
                                                                    id: data3[0].user_id
                                                                }
                                                            })
                                                            .then(data4 => {
                                                                if (data4.length != 0) {
                                                                    investor_names.push(data4[0].first_name)
                                                                    if (index + 1 == data2.length) {
                                                                        res.status(200)
                                                                            .json({
                                                                                CompanyContractsDetail: data2,
                                                                                number_of_milestones_contract: number_milestones,
                                                                                investor_names: investor_names,
                                                                                Companydata: data,
                                                                                CompanyTypes: data1,
                                                                                Message: 'Success',
                                                                                Successful: true
                                                                            })
                                                                    }
                                                                } else {
                                                                    res.status(200)
                                                                        .json({
                                                                            Message: 'Failed Data not found (representative name not found from users table) now we are in else',
                                                                            Successful: false
                                                                        })

                                                                }
                                                            })
                                                            .catch(function(err) {
                                                                res.status(404)
                                                                console.log(err)
                                                                    .json({
                                                                        Message: 'Failed',
                                                                        err,
                                                                        Successful: false
                                                                    })
                                                            })
                                                    } else {
                                                        res.status(200)
                                                            .json({
                                                                Message: 'Failed Data not found(user id is not found in investor) now we are in else',
                                                                Successful: false
                                                            })

                                                    }
                                                })
                                                .catch(function(err) {
                                                    res.status(404)
                                                    console.log(err)
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
                                                Message: 'Failed Data not found(there is no contract on this company) now we are in else',
                                                Successful: false

                                            })

                                    }
                                })
                                .catch(function(err) {
                                    res.status(404)
                                    console.log(err)
                                        .json({
                                            Message: 'Failed',
                                            err,
                                            Successful: false
                                        })
                                })
                        } else {
                            res.status(200)
                                .json({
                                    Message: 'Failed Data or company types not found now we are in else',
                                    Successful: false
                                })

                        }
                    })
                    .catch(function(err) {
                        res.status(404)
                        console.log(err)
                            .json({
                                Message: 'Failed',
                                err,
                                Successful: false
                            })
                    })
            } else {
                res.status(200)
                    .json({
                        Message: 'Failed Data or Company not found now we are in else',
                        Successful: false
                    })

            }
        })
        .catch(function(err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed',
                    err,
                    Successful: false
                })
        })
})
router.post('/Get_Feedback', (req, res, next) => {
    console.log("Feed back calling with id", req.body.data.C_Id)
    values = [{
        id: req.body.data.C_Id,
    }]
    models.company_investor.findAll({
            attributes: ['id'],
            include: [{ model: models.rate_milestone, require: true }],
            where: {
                id: values[0].id,
            }
        })
        .then(data => {
            if (data[0].rate_milestones.length != 0) {
                console.log(JSON.stringify(data));
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success',
                        Successful: true
                    })
            } else {
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success There is no  rate on milestone for this contract',
                        Successful: true
                    })
            }
        })
        .catch(function(err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed',
                    err,
                    Successful: false
                })
        })
})
router.post('/Modification_Description', (req, res, next) => {
    values = [{
        id: req.body.data.C_Id,

    }]
    models.company_investor.findAll({
            attributes: ['id'],
            include: [{ model: models.milestone, require: true, attributes: ['id', 'status', 'modefication_detail', 'modefication_attached', 'modefication_video'], where: { status: 'Modify' } }],
            where: {
                id: values[0].id,
            }
        })
        .then(data => {
            if (data.length != 0) {
                console.log(JSON.stringify(data));
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success',
                        Successful: true
                    })
            } else {
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success There is no  milestone for Modify of this contract',
                        Successful: false
                    })
            }
        })
        .catch(function(err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed',
                    err,
                    Successful: false
                })
        })
})
router.post('/Entrepreneur_Modification', (req, res, next) => {
    let milestone_id = req.body.data.M_Id

    let values = req.body.data.values

    models.milestone.findAll({
            attributes: ['status'],
            where: {
                id: milestone_id,
                status: 'Complete'

            }
        })
        .then(data => {
            if (data.length != 0) {

                models.milestone.update({

                        modefication_detail: values[0].modefication_detail,
                        modefication_attached: values[0].modefication_attached,
                        modefication_video: values[0].modefication_video,
                        status: values[0].status

                    }, {
                        where: {
                            id: milestone_id,
                            status: 'Complete'
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
                    .catch(function(err) {
                        res.status(404)
                        console.log(err)
                            .json({
                                Message: 'Failed',
                                err,
                                Successful: false
                            })
                    })
            } else {
                res.status(404)
                    .json({
                        Message: 'Failed , id not found or not complete',
                        Successful: false
                    })
            }
        })
        .catch(function(err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed',
                    err,
                    Successful: false
                })
        })
})
router.post('/Entrepreneur_Delivered', (req, res, next) => {
    values = [{
        id: req.body.data.C_Id,
    }]
    models.company_investor.findAll({
            attributes: ['id'],
            include: [{ model: models.milestone, require: true, attributes: ['id', 'project_tittle', 'project_description', 'milestone_start', 'milestone_end', 'amount', 'status'], where: { status: req.body.data.status } }],
            where: {
                id: values[0].id,
            }
        })
        .then(data => {
            if (data.length != 0) {
                console.log(JSON.stringify(data));
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success',
                        Successful: true
                    })
            } else {
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success There is no complete milestone of this contract',
                        Successful: false
                    })
            }
        })
        .catch(function(err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'Failed',
                    err,
                    Successful: false
                })
        })
})
router.post('/Entrepreneur_Company_Types', (req, res, next) => {

    let companies = []
    let entre_id = req.body.data.E_Id
    models.company.findAll({
            attributes: ['id'],
            where: {
                entre_id: entre_id
            }
        })
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                companies.push(data[index].id)
            }

            models.company.findAll({
                    attributes: [
                        [sequelize.fn('DISTINCT', sequelize.col('company_cat_id')), 'business_kind']
                    ],
                    where: {
                        entre_id: entre_id
                    }
                })
                .then(data1 => {
                    models.entrepreneurcompany.findAll({
                            attributes: [
                                [sequelize.fn('DISTINCT', sequelize.col('companytype_id')), 'business_type']
                            ],
                            where: {
                                company_id: companies
                            }
                        })
                        .then(data2 => {

                            res.status(200)
                                .json({
                                    business_kind: data1,
                                    business_types: data2,
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
module.exports = router;