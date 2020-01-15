const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal')
router.post('/Create_MileStones', (req, res, next) => {
    let values_company_investment = req.body.data.CompanyInvestor
    models.company_investor.bulkCreate(values_company_investment)
        .then(data => {
            //   console.log(data[0].id)
            let values_milestone = req.body.data.MilesStonesData;
            for (let index = 0; index < req.body.data.MilesStonesData.length; index++) {
                values_milestone[index].c_investor_id = data[0].id,
                    values_milestone[index].status = "Review"
            }
            // console.log("Miles stones data", values_milestone)

            models.milestone.bulkCreate(values_milestone)
                .then((data2) => {

                    res.status(200)
                        .json({
                            C_Id: data[0].id,
                            M_Id: data2[0].id,
                            Message: 'Successfully',
                            Successful: true
                        });
                    console.log("become company successfully")
                }).catch(function (err) {
                    console.log("There is an error")
                    res.status(404)
                        .json({

                            Message: 'Failed' + err,
                            Successful: false
                        });
                });

        })
})
router.post('/Payment_MileStone', (req, res, next) => {


    let values_milestone_payment = req.body.data.values

    models.contract_payments.findAll({
        where: {
            c_investor_id: req.body.data.values[0].c_investor_id,
            milestone_id: req.body.data.values[0].milestone_id
        }
    })
        .then(data => {
            if (data.length == 0) {
                models.contract_payments.bulkCreate(values_milestone_payment)
                    .then(function () {
                        res.status(200)
                            .json({
                                flag: false,
                                status: 'success',
                                Message: 'Successfully',
                                Successful: true
                            });
                        console.log("payment Done")
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
                res.status(404)
                    .json({
                        flag: true,
                        status: 'failed',
                        Message: 'failde because already payed',
                        Successful: true
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
router.post('/Card_Insert',(req,res,next)=>{
       
    values=req.body.data.values
          models.credit_card.bulkCreate(values)
          .then(function () {
              res.status(200)
                .json({
                  status: 'success',
                  Message: 'Successfully',
                  Successful: true
                });
            }).catch(function (err) {
              res.status(404)
                .json({
                  Message: 'Failed' + err,
                  Successful: false
                });
            });
      
      })
module.exports = router;