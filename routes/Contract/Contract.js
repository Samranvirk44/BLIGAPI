const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');
const sequelize = require('sequelize');
const Op = sequelize.Op
router.post('/Contract_Status', (req, res, next) => {
    console.log('Calling...', req.body.data)
    let company_investor_id = req.body.data.C_Id
    models.company_investor.update({
        status: req.body.data.Status,
        updated_at:new Date()
    }, {
        where: {
            id: company_investor_id,
        }
    }).then(() => {
        res.status(200)
            .json({
                Message: 'Success',
                Successful: true
            });
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
router.post('/Milestone_Status', (req, res, next) => {
    console.log("i am calling...", req.body.data.M_Id)
    let milestone_id = req.body.data.M_Id

    let values = [{
        status: req.body.data.Status,
    }]
    models.milestone.findAll({
        where: {
            [Op.or]: [{ status: 'Modify' }, { status: 'Going' }],
            id: milestone_id,

        }
    })
        .then(data => {
            console.log(JSON.stringify(data))
            if (data.length != 0) {
                models.milestone.update({

                    status: values[0].status,
                }, {
                    where: {
                        id: milestone_id,
                    }
                })
                    .then(() => {
                        console.log("Milestone is complete by entreprenuer")
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

            }
            else {
                res.status(404)
                    .json({
                        Message: 'Failed id not found or not in Going or Modify',
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
router.post('/Milestone_Completed', (req, res, next) => {
    let milestone_id = req.body.data.M_Id
    let values = [{
        status: 'Completed',
        // feedback: 'Thunkx dude you done work very well', //its feed back from investor to entrepre after completion his milestone
        // feedback_attached: 'ha',
        // feedback_vide0: 'url'
    }]                                                     //we will change the name of column milestone_desc to feedback

    models.milestone.findAll({
        attributes: ['status'],
        where: {
            id: milestone_id,
            status: 'Complete'                            // [Op.or]: [{status:'Mudify'}, {status:'Complete'}] 

        }
    })
        .then(data => {
            if (data.length != 0) {

                models.milestone.update({

                    status: values[0].status,
                    feedback: values[0].feedback

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
                res.status(404)
                    .json({
                        Message: 'Failed , id not found or not complete',
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
module.exports = router;