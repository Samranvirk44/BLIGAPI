const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/Wallet_Entrepreneur', (req, res, next) => {
    console.log('entrepreneur wallet calling')

    entreprenuer_id = req.body.data.Id           //this id
    companies_id = []
    models.company.findAll({
        attributes: ['id'],
        where: {
            entre_id: entreprenuer_id
        }
    })
        .then(c_data => {
            if (c_data.length != 0) {

                for (let index_c = 0; index_c < c_data.length; index_c++) {
                    companies_id.push(c_data[index_c].id)
                }
                let milestone_id = []
                models.company_investor.findAll({
                    attributes: ['id'],
                    include: [{ model: models.milestone, required: true, attributes: ['id'] }],
                    where: {
                        company_id: companies_id
                    }
                })
                    .then(data => {
                        console.log(JSON.stringify(data))
                       // console.log("legth of data", data.length)
                        if (data.length != 0) {
                            for (let index = 0; index < data.length; index++) {
                                // console.log("number of milestones",data[index].milestones[index1].length)
                                for (let index1 = 0; index1 < data[index].milestones.length; index1++) {
                                    milestone_id.push(data[index].milestones[index1].id)
                                    console.log("id of miles stone", data[index].milestones[index1].id)
                                }
                            }
                            console.log(milestone_id)
                            if (milestone_id.length != 0) {
                                models.contract_payments.findAll({
                                    where: {
                                        milestone_id: milestone_id,
                                        status: req.body.data.Status            //change status here
                                    }
                                })
                                    .then(data1 => {
                                        if (data1.length != 0) {
                                            console.log(JSON.stringify(data1));
                                            res.status(200)
                                                .json({
                                                    data: data1,
                                                    Message: 'Success',
                                                    Successful: true
                                                })
                                        }
                                        else {
                                            res.status(200)
                                                .json({
                                                    Message: 'Failed there is no payment on milestone payments',
                                                    Successful: false
                                                });

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
                            }
                            else {
                                res.status(200)
                                    .json({
                                        Message: 'Failed there is no payment on milestone',
                                        Successful: false
                                    });
                            }
                        }
                        else {

                            res.status(200)
                                .json({
                                    Message: 'Failed there is no milestone ',
                                    Successful: false
                                });
                        }
                    }).catch(function (err) {
                        console.log(err)
                        console.log("There is an error")
                        res.status(404)
                            .json({
                                Message: 'Failed' + err,
                                Successful: false
                            });
                    });
                console.log("companies id", companies_id)
            }
            else {
                console.log("there is no company of this user")
            }
        })
})
router.post('/Wallet_Investor', (req, res, next) => {
console.log('investor wallet calling')
    let investor_id = req.body.data.Id
    let milestone_id = []
    models.company_investor.findAll({
        attributes: ['id'],
        include: [{ model: models.milestone, required: true, attributes: ['id','project_description'] }],
        where: {
            investor_id: investor_id
        }
    })
        .then(data => {
            console.log(JSON.stringify(data))
            console.log("legth of data", data.length)
            if (data.length != 0) {
                for (let index = 0; index < data.length; index++) {
                    // console.log("number of milestones",data[index].milestones[index1].length)
                    for (let index1 = 0; index1 < data[index].milestones.length; index1++) {
                        milestone_id.push(data[index].milestones[index1].id)
                        console.log("id of miles stone", data[index].milestones[index1].id)
                    }
                }
                console.log(milestone_id)
                if (milestone_id.length != 0) {
                    models.contract_payments.findAll({
                        where: {
                            milestone_id: milestone_id,
                            status: req.body.data.Status
                        }
                    })
                        .then(data1 => {
                            if (data1.length != 0) {
                                console.log(JSON.stringify(data1));
                                res.status(200)
                                    .json({
                                        data: data1,
                                        Message: 'Success',
                                        Successful: true
                                    })
                            }
                            else {
                                res.status(200)
                                    .json({
                                        Message: 'Failed there is no payment on milestone payments',
                                        Successful: false
                                    });

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
                }
                else {
                    res.status(200)
                        .json({
                            Message: 'Failed there is no payment on milestone',
                            Successful: false
                        });
                }
            }
            else {

                res.status(200)
                    .json({
                        Message: 'Failed there is no milestone ',
                        Successful: false
                    });
            }
        }).catch(function (err) {
            console.log(err)
            console.log("There is an error")
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        });

})
router.post('/Milestone_Description', (req, res, next) => {
    milestone_id = req.body.data.M_Id
    models.milestone.findAll({
      attributes: ['project_description'],
      where: {
        id: milestone_id
      }
    })
      .then(data => {
        res.status(200)
          .json({
            data: data,
            Message: 'Success',
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
module.exports = router;