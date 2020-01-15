const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal')
router.post('/Create_Webinar', (req, res, next) => {
    let values = req.body.data.values
    // let values=[{
    //     title:"my_webinar",   //its from company_investor.id (fk)
    //     description:"webinar is toto titi",   //its from milestone.id  (fk)
    //     name:"john player",        //its from milestone.amount
    //     date:'2008-01-01 00:00:01',// I dont know
    //     video_uri:'path'
    // }]
    models.webinar.bulkCreate(values)
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    Message: 'Successfully',
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



router.post('/Create_Seminar', (req, res, next) => {
    let values = req.body.data.values

    // let values=[{
    //     title:"my_webinar",   //its from company_investor.id (fk)
    //     description:"webinar is toto titi",   //its from milestone.id  (fk)
    //     name:"john player",        //its from milestone.amount
    //     date:'2008-01-01 00:00:01',// I dont know
    //     address:'lahore',
    //     video_uri:'path'
    // }]
    models.seminar.bulkCreate(values)
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    Message: 'Successfully',
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






router.get('/Webinar', (req, res, next) => {

    models.webinar.findAll({

    })
        .then(data => {
            if (data.length != 0) {
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Successfully',
                        Successful: true
                    });
            } else {
                res.status(200)
                    .json({
                        // data: data,
                        Message: 'Empty',
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

router.get('/Seminar', (req, res, next) => {

    models.seminar.findAll({

    })
        .then(data => {
            // console.log(JSON.stringify(data))
            if (data.length != 0) {
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Successfully',
                        Successful: true
                    });

            } else {
                res.status(200)
                    .json({
                        // data: data,
                        Message: 'Empty',
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

module.exports = router;