
const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal')
router.post('/IServices', (req, res, next) => {
    console.log("entrepreneur_companyservices creating....")
    var email =req.body.data.Email;
    ////////////user_id from users2///////
    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    }).then(data => {
        var user_idd = data[0].id
        models.investors.findAll({
            attributes: ['id'],
            where: {
                user_id: user_idd
            }
        })
            .then(data => {
                if (data.length != 0) {
                    var user_id = data[0].id
                    let values = []
                    for (let index = 0; index < req.body.data.Services.length; index++) {
                      values.push({ investor_id: user_id, services_id: req.body.data.Services[index] })
                  }
                    models.investorservices.findAll({
                      attributes:['id'],
                      where:{
                           investor_id:data[0].id
                      }
                    })
                    .then(investor => {
                      
                      if(investor.length!=0){
                    
                        models.investorservices.destroy({ where: { investor_id: data[0].id } })
                        .then(()=>{
                          models.investorservices.bulkCreate(values)
                    .then(() => {
                        res.status(200)
                            .json({
                                Message: 'Successful dell and update',
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
  
                                             }
                      else{
  
                        //copy
                        models.investorservices.bulkCreate(values)
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
                        //
      
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
                            Message: 'Failed' + err,
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
            })
    })
  })
router.post('/ITypes', (req, res, next) => {
    var email = req.body.data.Email;
    ////////////user_id from users2///////
    models.users2.findAll({
        attributes: ['id'],
        where: {
            email: email
        }
    }).then(data => {
        var user_idd = data[0].id
        models.investors.findAll({
            attributes: ['id'],
            where: {
                user_id: user_idd
            }
        })
            .then(data1 => {
               // console.log("length:", data1.length)
                //console.log("investor id", data1[0].id)
                if (data1.length != 0) {
                    var user_id = data1[0].id
                    let values = []
                    for (let index = 0; index < req.body.data.Types.length; index++) {
                        values.push({ investor_id: user_id, companytype_id: req.body.data.Types[index] })
                    }
                    models.investortype.findAll({
                        attributes: ['id'],
                        where: {
                            investor_id: data1[0].id
                        }
                    }).then(data2 => {
                        console.log('length of types:', data2.length)
                        if (data2.length != 0) {
                            console.log("we have to dell")
                            models.investortype.destroy({ where: { investor_id: data1[0].id } })
                                .then(() => {
                                    models.investortype.bulkCreate(values)
                                        .then(() => {
                                            res.status(200)
                                                .json({
                                                    Message: 'Successful del and creat again',
                                                    Successful: true
                                                })
                                        })
                                        .catch(function (err) {
                                            res.status(404)
                                                .json({
                                                    Message: 'Failed' + err,
                                                    Successful: false
                                                });
                                        });
                                })
                                .catch(function (err) {
                                    res.status(404)
                                        .json({
                                            Message: 'Failed' + err,
                                            Successful: false
                                        });
                                });


                        }
                        else {
                            models.investortype.bulkCreate(values)
                                .then(() => {
                                    res.status(200)
                                        .json({
                                            Message: 'Successful',
                                            Successful: true
                                        })
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


                }
                else {
                    res.status(404)
                        .json({
                            Message: 'Failed here' + err,
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
            })
    })
}) 
router.post('/Investor_Contracts', (req, res, next) => {
    values = [{
        investor_id: req.body.data.I_id,
        status: req.body.data.Status
    }]

    models.company_investor.findAll({
        attributes: ['id',],
        where: {
            investor_id: values[0].investor_id,
            status: values[0].status
        }
    })
        .then(data => {
            if (data.length != 0) {
                //console.log(data)
                console.log(data.length)
                res.status(200)
                    .json({
                        Message: 'Successful',
                        data: data.length,
                        Successful: true
                    });
            }
            else {
                res.status(200)
                    .json({
                        Message: 'There are no contracts',
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
router.post('/Investor_Types', (req, res, next) => {
    //  console.log("Getting data")
    var investorID = req.body.data.I_id
    models.investortype.findAll({
        attributes: ['companytype_id'],
        where: {
            investor_id: investorID
        }
    }).then(function (data5) {
        let temp = []
        for (let index = 0; index < data5.length; index++) {
            temp.push(data5[index].companytype_id)
        }
        models.company_type.findAll({
            attributes: ['type_name'],
            where: {
                id: temp
            }
        }).then(function (data6) {
            let temp2 = []
            //console.log("data length",data6.length)
            for (let index = 0; index < data6.length; index++) {
                temp2.push(data6[index].type_name)
            }
            if (temp2.length == 0) {
                res.status(200)
                    .json({
                        Successful: false,
                        data: [],
                        Message: 'Successful Empty'
                    })
            } else {
                res.status(200)
                    .json({
                        Successful: true,
                        data: temp2,
                        Message: 'Successful'
                    })
            }
        })
    })
})
router.post('/Investor_Contract_Detail', (req, res, next) => {
    let flag = false
    let flag1 = false
    let investors_name = []
    let contracts_id = []
    let companies_contracted_name = []
    let status = req.body.data.Status
    let investor_id = req.body.data.I_Id
    let MarketPlace = req.body.data.MarketPlace


    models.company_investor.findAll({
        attributes: ['investor_id', 'id', 'company_id', 'total_investment', 'investor_equity'],
        where: {
            investor_id: investor_id,
            status: status
        }
    })
        .then(data1 => {
            console.log("Investors contracts")
            console.log(JSON.stringify(data1));
            if (data1.length != 0) {
                console.log("length of data1: " + data1.length)
                for (let index = 0; index < data1.length; index++) {
                    if (index + 1 == data1.length) {
                        flag = true
                    }
                    console.log(flag)
                    models.company.findAll({
                        attributes: ['id', 'company_name', 'company_logo'],
                        where: {
                            id: [data1[index].company_id]

                        }
                    })
                        .then(data2 => {
                            console.log(JSON.stringify(data2));
                            companies_contracted_name.push({ name: data2[0].company_name, id: data2[0].id, company_logo: data2[0].company_logo })

                            console.log(companies_contracted_name)
                        })
                        .catch(function (err) {
                            res.status(404)
                            console.log(err)
                                .json({
                                    Message: 'Failed', err,
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
                                console.log(JSON.stringify(data3[0].user_id));
                                models.users2.findAll({
                                    attributes: ['first_name', 'id'],
                                    where: {
                                        id: data3[0].user_id
                                    }
                                })
                                    .then(data4 => {

                                        investors_name.push({ name: data4[0].first_name, investors_id: data4[0].id })
                                        console.log(data4[0].email)
                                        console.log(investors_name)

                                        for (let index = 0; index < data4.length; index++) {
                                            if (index + 1 == data4.length) {
                                                flag1 = true
                                            }
                                        }
                                        console.log(flag1)
                                        if (index + 1 == data1.length && flag == true && flag1 == true) {
                                            contracts_id.push(data1[index].id)
                                            console.log("print names of company" + companies_contracted_name)
                                            console.log(data1)
                                            res.status(200)
                                                .json({
                                                    data1: data1,
                                                    companies_contracted_name: companies_contracted_name,
                                                    investors_name: investors_name,
                                                    Message: 'Success',
                                                    Successful: true,
                                                })

                                        }
                                    })
                            }
                            else {
                                console.log("user is not")
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
                    console.log("response is here")
                }
            }
            else {
                console.log(data1)
                console.log("contracts are not exits")
                res.status(404)
                    .json({
                        Message: 'Failed there is no contact in ' + status + ' mode',
                        Successful: false
                    })
            }
        })
})
router.post('/Investor_Investment', (req, res, next) => {
    let investor_id=req.body.data.I_Id
    models.investors.findAll({
      attributes:['total_investment'],
      where:{
        id:investor_id
      }
    })
    .then((data)=>{
      res.status(200)
      .json({
        total_investment:data,
       Successful: true,
       Message: 'Successfully'
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
router.post('/Rate_MileStone', (req, res, next) => {
    console.log(req.body.data)
    let values = [{
        c_investor_id: req.body.data.C_Id,
        milestone_id: req.body.data.milestone_id,
        rate_value_time: req.body.data.values[0],
        rate_value_professionalism: req.body.data.values[1],
        rate_value_leadership: req.body.data.values[2],
        rate_value_success_rate_per_stage: req.body.data.values[3],
        rate_value_communicaion_skils: req.body.data.values[4],
    }]
    models.rate_milestone.bulkCreate(values)
        .then(function () {
            res.status(200)
                .json({
                    Message: 'Successfully Rated.',
                    Successful: true
                });
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
router.post('/Complete_Milestone', (req, res, next) => {
    values = [{
        investor_id: req.body.data.I_Id,
    }]
    models.company_investor.findAll({
        attributes: ['id'],
        include: [{ model: models.milestone, require: true, attributes: ['id', 'c_investor_id', 'project_tittle', 'project_description', 'milestone_start', 'milestone_end', 'amount', 'status'], where: { status: 'Complete' } }],
        where: {
            investor_id: values[0].investor_id,
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
            }
            else {
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success There is no completed milestone of this contract',
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
router.post('/Get_Investor_TS', (req, res, next) => {

    let investor_id=req.body.data.entre_id
      models.investors.findOne({
        include: [{ model: models.investortype, required: true, attributes: ['investor_id', 'companytype_id'] }],
        where: {
        //  id: company_id,
          id:investor_id
        }
      })
    .then(data=>{
  
      models.investors.findOne({
        attributes: ['id'],
        include: [{ model: models.investorservices, required: true, attributes: ['investor_id', 'services_id'] }],
        where: {
          //id: company_id,
          id:investor_id
        }
      })
      .then(data1=>{
  
        console.log(JSON.stringify(data))
        console.log(JSON.stringify(data1))
        res.status(200)
          .json({
           Investor_Types:data,
           Services:data1,
           Successful: true,
           Message: 'Successfully'
            })
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
module.exports = router;