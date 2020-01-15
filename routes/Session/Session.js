const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');

router.post('/Update_Mode_Status', (req, res, next) => {

    var curredate = new Date()
    let values = [{
        mac_address: req.body.data.Mac,
        status: true,
    }]

    models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            status: values[0].status,
            mac_address: values[0].mac_address
        }
    })
        .then(data => {
            if (data.length != 0) {
                models.session.update({
                    status: false,
                }, {
                        where: {
                            status: values[0].status,
                            mac_address: values[0].mac_address
                        }
                    })
                    .then(() => {
                        let values1 = [{
                            email: data[0].email,
                            mac_address: values[0].mac_address,
                            status: true,
                            created_at: curredate,
                            entrepreneur: false
                        }]
                        let values2 = [{
                            email: data[0].email,
                            mac_address: values[0].mac_address,
                            status: true,
                            created_at: curredate,
                            entrepreneur: true
                        }]
                        if (data[0].entrepreneur == true) {
                            models.session.bulkCreate(values1)
                                .then(() => {
                                    res.status(200)
                                        .json({
                                            Message: 'Successlly become investor',
                                            Successful: true

                                        })
                                })
                                .catch(function (err) {
                                    res.status(404)
                                    console.log(err)
                                        .json({
                                            Message: 'failed',
                                            Successful: false
                                        })
                                })


                        }
                        else {

                            models.session.bulkCreate(values2)
                                .then(() => {
                                    res.status(200)
                                        .json({
                                            Message: 'Successlly become entreprenuer',
                                            Successful: true

                                        })
                                })
                                .catch(function (err) {
                                    res.status(404)
                                    console.log(err)
                                        .json({
                                            Message: 'failed',
                                            Successful: false
                                        })
                                })
                        }

                    })
                    .catch(function (err) {
                        res.status(404)
                        console.log(err)
                            .json({
                                Message: 'failed',
                                Successful: false
                            })
                    })

            }
            else {

                res.status(404)
                    .json({
                        Message: 'failed not log in currently',
                        Successful: false
                    })
            }
        })
        .catch(function (err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: 'failed',
                    Successful: false
                })
        })



})

router.post('/Check_Mode', (req, res, next) => {
    let mac = req.body.data.Mac
    let mode = req.body.data.Mode
    models.session.findAll({
        attributes: ['email'],
        where: {
            mac_address: mac,
            status: true
        }
    })
        .then(data => {
            if (data.length != 0) {
                models.users2.findAll({
                    attributes: ['id'],
                    where: {
                        email: data[0].email
                    }
                })
                    .then(data1 => {
                        if (data1.length != 0) {
                            if (mode == 'Investor') {
                                models.investors.findAll({
                                    attributes: ['id', 'active'],
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data2 => {
                                        if (data2.length != 0) {
                                            Inverstor = true

                                            res.status(200)
                                                .json({
                                                    active: data2[0].active,
                                                    invester_entreprenuer: true,
                                                    Message: 'Success Investor',
                                                    Successful: true
                                                })
                                        }
                                        else {
                                            res.status(200)
                                                .json({
                                                    invester_entreprenuer: false,
                                                    Message: 'Success Not Investor',
                                                    Successful: true
                                                })
                                        }
                                    })
                            }
                            else {
                                models.entreprenuers.findAll({
                                    attributes: ['id', 'active'],
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data3 => {
                                        if (data3.length != 0) {
                                            Entrepreneur = true
                                            res.status(200)
                                                .json({
                                                    active: data3[0].active,
                                                    invester_entreprenuer: true,
                                                    Message: 'Success Entreprenuer',
                                                    Successful: true
                                                })
                                        }
                                        else {

                                            res.status(200)
                                                .json({
                                                    invester_entreprenuer: false,
                                                    Message: 'Success not Entreprenuer',
                                                    Successful: true
                                                })
                                        }
                                    })

                            }

                        }
                        else {
                            res.status(404)
                                .json({
                                    Message: ' user  not exists in users currentrly',
                                    Successful: false
                                })
                        }
                    })

            }
            else {
                res.status(404)
                    .json({
                        Message: ' user  not login currentrly',
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


router.post('/Get_Drawer_Data', (req, res, next) => { //in progress
    let values = [{
        mac_address: req.body.data.MacAddress,
        status: true
    }]
    models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            mac_address: values[0].mac_address,
            status: values[0].status
        }
    })
        .then(data => {
            if (data.length != 0) {
                // entreprenuer = data[0].entrepreneur
                models.users2.findAll({
                    attributes: ['id', 'first_name','profile_pic'],
                    where: {
                        email: data[0].email
                    }
                })
                    .then(data1 => {
                        if (data1.length != 0) {
                            if (data[0].entrepreneur == true) {
                                models.entreprenuers.findAll({
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data2 => {
                                        if (data2.length != 0) {
                                            //  console.log(JSON.stringify(data1))
                                            // console.log(JSON.stringify(data2))
                                            res.status(200)
                                                .json({
                                                    User_data: data1,
                                                    data: data2,
                                                    Ent: true,
                                                    Successful: true,
                                                    Message: 'Successfully Entrepreneur'
                                                })
                                        }
                                        else {
                                            res.status(404)
                                                .json({
                                                    Message: "Failed not found entreprenuer into user table",
                                                    Successful: false
                                                })
                                        }
                                    })
                            }
                            else {
                                models.investors.findAll({
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data2 => {
                                        if (data2.length != 0) {
                                            // console.log(JSON.stringify(data1))
                                            // console.log(JSON.stringify(data2))
                                            res.status(200)
                                                .json({
                                                    User_data: data1,
                                                    data: data2,
                                                    Successful: true,
                                                    Ent: false,
                                                    Message: 'Successfully Investor'
                                                })
                                        }
                                        else {
                                            res.status(404)
                                                .json({
                                                    Message: "Failed not found investor into user table",
                                                    Successful: false
                                                })
                                        }
                                    })
                            }
                        }
                        else {
                            res.status(404)
                                .json({
                                    Message: "Failed not found user into user table",
                                    Successful: false
                                })
                        }
                    }).catch(err => {
                        res.status(404)
                            .json({
                                Message: "Failed ",
                                Successful: false
                            })
                    })
            }
        })
})

router.post('/CreateSession_LogIn', (req, res, next) => {
    console.log("session is creating")
    var curredate = new Date()
    //  console.log(curredate)
    let values = [{
        email: req.body.data.Email,
        mac_address: req.body.data.Mac,
        status: true,
        created_at: curredate
    }]

    models.session.findAll({
        where: {
            email: values[0].email,
            mac_address: values[0].mac_address,

        }
    }).then(data => {
        if (data.length == 0) {
            models.session.bulkCreate(values)
                .then(() => {
                    res.status(200)
                        .json({
                            Message: "Successfully",
                            Successful: true
                        })
                })
                .catch(function (err) {
                    res.status(404)
                    console.log(err)
                        .json({
                            Message: "Failed " + err,
                            Successful: false
                        })
                })

        }
        else {
            models.session.update({
                status: false
            }, {
                    where: {
                        status: true,
                        mac_address: values[0].mac_address
                    }
                }).then(s => {

                    models.session.update({
                        updated_at: curredate,
                        status: values[0].status,

                    }, {
                            where: {
                                email: values[0].email,

                            }
                        })
                        .then(() => {
                            res.status(200)
                                .json({
                                    Message: "Successfully",
                                    Successful: true
                                })
                        })
                        .catch(function (err) {
                            res.status(404)
                            console.log(err)
                                .json({
                                    Message: "Failed " + err,
                                    Successful: false
                                })
                        })
                }).catch(function (err) {
                    res.status(404)
                    console.log(err)
                        .json({
                            Message: "Failed " + err,
                            Successful: false
                        })
                })
        }

    })
})
router.post('/Check_Session', (req, res, next) => {
    console.log("Mac address", req.body.data.Mac)
    models.session.findAll({
        attributes: ['email','entrepreneur'],
        where: {
            mac_address: req.body.data.Mac,
            status: true
        }
    })
        .then(data => {
            if (data.length != 0) {
                res.status(200)
                    .json({
                        Message: 'User is login currently',
                        Email: data[0].email,
                        Ent:data[0].entrepreneur,
                        Successful: true
                    });
            }
            else {
                res.status(200)
                    .json({
                        Message: 'User is not sign in currently',
                        Successful: false
                    });
            }
        })
        .catch(function (err) {
            console.log(err)
            res.status(404)
                .json({
                    status: "failed",
                    message: "failed"
                })
        })

})
router.post('/Logout_Session', (req, res, next) => {
    let values = [{
        mac_address: req.body.data.Mac,
        status: true,
    }]
    models.session.update({
        status: false,
    }, {
            where: {
                status: values[0].status,
                mac_address: values[0].mac_address
            }
        })
        .then(() => {
            res.status(200)
                .json({
                    Successful: true,
                    Message: "logout session successfully"

                })
        })
        .catch(function (err) {
            res.status(404)
            console.log(err)
                .json({
                    Successful: false,
                    Message: "failed"
                })
        })
})
router.post('/Check_Registeration', (req, res, next) => {
    var email = req.body.data.Email

    models.users2.findAll({
        //   attributes: ['id'],
        where: {
            email: email
        }
    })
        .then(data => {
            let Investor = false;
            let Entrepreneur = false;
            if (data.length != 0) {
                console.log(data)
                models.entreprenuers.findAll({
                    //   attributes: ['id'],
                    where: {
                        user_id: data[0].id
                    }
                })
                    .then(data1 => {
                        if (data1.length != 0) {
                            Entrepreneur = true

                        }
                        models.investors.findAll({
                            //       attributes: ['id'],
                            where: {
                                user_id: data[0].id
                            }
                        })
                            .then(data2 => {
                                if (data2.length != 0) {
                                    Investor = true
                                }
                                res.status(200)
                                    .json({
                                        Message: 'Successful',
                                        User_Data: data,
                                        Entrepreneur_Data: data1,
                                        Investor_Data: data2,
                                        Successful: true,
                                        Investor: Investor,
                                        Entrepreneur: Entrepreneur
                                    })
                            })
                            .catch(function (err) {
                                res.status(404)
                                console.log(err)
                                    .json({
                                        status: "failed",
                                        message: "failed",
                                        Successful: false
                                    })
                            })
                    })
                    .catch(function (err) {
                        res.status(404)
                        console.log(err)
                            .json({
                                status: "failed",
                                message: "failed",
                                Successful: false
                            })
                    })
            }
            else {
                res.status(404)
                    .json({
                        Message: 'Failed',
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

router.get('/Device_Session', (req, res, next) => {
    let values = [{
        mac_address: '12,23,200',
        status: true
    }]
    var entreprenuer = null
    models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            mac_address: values[0].mac_address,
            status: values[0].status

        }
    })
        .then(data => {
            //console.log(data)
            if (data.length != 0) {
                entreprenuer = data[0].entrepreneur
                models.users2.findAll({
                    attributes: ['id'],
                    where: {
                        email: data[0].email
                    }
                })
                    .then(data1 => {
                        console.log(entreprenuer)
                        if (data1.length != 0) {
                            if (data1.length != 0 && entreprenuer == true) {
                                console.log(data1)
                                models.entreprenuers.findOne({
                                    attributes: ['id'],
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data => {
                                        console.log(data)
                                        res.status(200)
                                            .json({
                                                data: data,
                                                status: "success",
                                                message: "get successfully entrepreneur id"

                                            })
                                    })
                                    .catch(function (err) {
                                        res.status(404)
                                        console.log(err)
                                            .json({
                                                status: "failed",
                                                message: "failed"
                                            })
                                    })
                            }
                            else {
                                console.log(data1)
                                models.investors.findOne({
                                    attributes: ['id'],
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data => {
                                        console.log(data)
                                        res.status(200)
                                            .json({
                                                data: data,
                                                status: "success",
                                                message: "get successfully investor id"

                                            })
                                    })
                                    .catch(function (err) {
                                        res.status(404)
                                        console.log(err)
                                            .json({
                                                status: "failed",
                                                message: "failed"
                                            })
                                    })
                            }
                        }
                        else {
                            res.status(404)

                                .json({
                                    status: "failed",
                                    message: "user is not exist in users2 table"
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
            }
            else {
                res.status(200)
                    .json({
                        Message: 'User is not sign in currently',
                        Successful: true
                    });
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
router.post('/Get_Email', (req, res, next) => {
    //  console.log("<><><><>",req.body.data.MacAddress)
    var mac_address = req.body.data.MacAddress
    models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            mac_address: mac_address,
            status: true,
            // entrepreneur:false
        }
    })
        .then(data => {
            //  console.log('data:',data)
            if (data.length != 0) {
                res.status(200)
                    .json({
                        data: data,
                        Message: 'Success',
                        Successful: true

                    })
            }
            else {
                res.status(404)
                    .json({
                        Message: 'Failed',
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
router.post('/Get_Current_Id', (req, res, next) => {
    //console.log("calling ",req.body.data.MacAddress)
    let values = [{
        mac_address: req.body.data.MacAddress,
        status: true
    }]
    models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            mac_address: values[0].mac_address,
            status: values[0].status
        }
    })
        .then(data => {
            console.log("i am adata", data.length)
            if (data.length != 0) {
                let entreprenuer = data[0].entrepreneur
                models.users2.findAll({
                    attributes: ['id'],
                    where: {
                        email: data[0].email
                    }
                })
                    .then(data1 => {
                        console.log("userdata1", data1.length)
                        if (data1.length != 0) {

                            if (data1.length != 0 && entreprenuer == false) {
                                var useridd = data1[0].id
                                // console.log('useridd:', useridd)
                                models.investors.findAll({
                                    attributes: ['id'],
                                    where: {
                                        user_id: useridd
                                    }
                                })
                                    .then(data3 => {
                                        if (data3.length != 0) {
                                            res.status(200)
                                                .json({
                                                    data: {
                                                        investor_id: data3[0].id,
                                                        user_id: data1[0].id,
                                                        entrepreneur_id: [],
                                                        Type: 'Investor'
                                                    },
                                                    Message: "get successfully investor id",
                                                    Successful: true

                                                })
                                        } else {
                                            res.status(200)
                                                .json({

                                                    Message: 'Empty',
                                                    Successful: false
                                                })
                                        }
                                    })
                                    .catch(function (err) {
                                        res.status(404)
                                            .json({
                                                Message: 'Failed ' + err,
                                                Successful: false
                                            })
                                    })
                            }
                            else if (data1.length != 0 && entreprenuer == true) {
                                var useridd = data1[0].id
                                models.entreprenuers.findAll({
                                    attributes: ['id'],
                                    where: {
                                        user_id: useridd
                                    }
                                })
                                    .then(data4 => {
                                        if (data4.length != 0) {
                                            res.status(200)
                                                .json({
                                                    data: {
                                                        entrepreneur_id: data4[0].id,
                                                        user_id: data1[0].id,
                                                        investor_id: [],
                                                        Type: 'Entrepreneur'
                                                    },
                                                    Message: "get successfully entrepreneur id",
                                                    Successful: true,
                                                })
                                        }
                                        else {
                                            res.status(200)
                                                .json({

                                                    Message: 'Empty',
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
                            }
                            else {
                                res.status(404)
                                    .json({
                                        Message: 'Failed',
                                        Successful: false
                                    })
                            }
                        }
                        else {
                            res.status(404)
                                .json({
                                    Message: 'Failed',
                                    Successful: false
                                })
                        }
                    })
                    .catch(function (err) {
                        res.status(404)
                            .json({
                                Message: 'Failed', err,
                                Successful: false
                            })
                    })
            }
            else {
                res.status(200)
                    .json({
                        Message: 'User is not sign in currently',
                        Successful: true
                    });
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
router.post('/Get_User_Id', (req, res, next) => { //in progress
    let values = [{
        mac_address: req.body.data.MacAddress,
        status: true
    }]
    models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            mac_address: values[0].mac_address,
            status: values[0].status
        }
    })
        .then(data => {
            if (data.length != 0) {
                entreprenuer = data[0].entrepreneur
                models.users2.findAll({
                    attributes: ['id'],
                    where: {
                        email: data[0].email
                    }
                })
                    .then(data1 => {
                        if (data1.length != 0) {
                            res.status(200)
                                .json({
                                    User_Id: data1[0].id,
                                    Message: "Successfully",
                                    Successful: true
                                })
                        }
                    }).catch(err => {
                        res.status(404)
                            .json({
                                Message: "Failed ",
                                Successful: false
                            })
                    })
            }
        })
})
router.put('/Session_Update', (req, res, next) => {

    models.session.update({
        //        updated_at: curredate,
        entrepreneur: req.body.data.Entrepreneur
    }, {
            where: {
                status: true,
                mac_address: req.body.data.Mac
            }
        })
        .then(() => {
            res.status(200)
                .json({
                    Message: "Successfully",
                    Successful: true
                })
        })
        .catch(function (err) {
            res.status(404)
            console.log(err)
                .json({
                    Message: "Failed " + err,
                    Successful: false
                })
        })
})
router.post('/Check_Status_Type', (req, res, next) => {//used in drawer
    var mac = req.body.data.Mac
    models.session.findAll({
        attributes: ['email', 'entrepreneur'],
        where: {
            mac_address: mac,
            status: true
        }
    }).then(function (emailData) {
        if (emailData.length != 0) {
            var entrepreneur = emailData[0].dataValues.entrepreneur
            var email = emailData[0].dataValues.email
            models.users2.findAll({
                attributes: ['id'],
                where: {
                    email: email
                }
            }).then(function (useridData) {
                if (useridData.length != 0) {
                    var userid = useridData[0].dataValues.id
                    if (entrepreneur == true) {

                        models.entreprenuers.findAll({
                            attributes: ['id'],
                            where: {
                                user_id: userid
                            }
                        }).then(function (entreidData) {
                            if (entreidData.length != 0) {
                                res.status(200)
                                    .json({
                                        Message: 'Successful Entrepreneur',
                                        data: { entrepreneurID: entreidData[0].dataValues.id, investorID: [] },
                                        Successful: true,
                                        Type: 'Entrepreneur',
                                        Investor: false,
                                        Entrepreneur: true
                                    })
                            }
                            else {
                                res.status(200)
                                    .json({
                                        Message: 'Empty',
                                        Investor: false,
                                        Entrepreneur: false,
                                        Successful: false
                                    })
                            }
                        }).catch(function (err) {
                            res.status(404)
                                .json({
                                    Message: 'Failed' + err,
                                    Successful: false
                                });
                        });

                    }
                    else if (entrepreneur == false) {
                        models.investors.findAll({
                            attributes: ['id'],
                            where: {
                                user_id: userid
                            }
                        }).then(function (investoridData) {
                            if (investoridData.length != 0) {
                                res.status(200)
                                    .json({
                                        Message: 'Successful Investor',
                                        data: { entrepreneurID: [], investorID: investoridData[0].dataValues.id },
                                        Successful: true,
                                        Type: 'Investor',
                                        Investor: true,
                                        Entrepreneur: false
                                    })
                            }
                            else {
                                res.status(200)
                                    .json({
                                        Message: 'Empty',
                                        Investor: false,
                                        Entrepreneur: false,
                                        Successful: false
                                    })
                            }

                        }).catch(function (err) {
                            res.status(404)
                                .json({
                                    Message: 'Failed' + err,
                                    Successful: false
                                });
                        });
                    }

                }
                else {
                    res.status(200)
                        .json({
                            Message: 'Empty',
                            data: [],
                            Successful: false
                        })
                }
            }).catch(function (err) {

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
                    Message: 'Empty',
                    data: [],
                    Successful: false
                })
        }
    }).catch(function (err) {
        res.status(404)
            .json({
                Message: 'Failed' + err,
                Successful: false
            });
    });

})
router.post('/User_Subs_Payment', (req, res, next) => {
    let mac = req.body.data.Mac

    models.session.findAll({
        attributes: ['email'],
        where: {
            mac_address: mac,
            status: true
        }
    })
        .then(data => {
            if (data.length != 0) {
                console.log("user found")
                models.users2.findAll({
                    attributes: ['id', 'active'],
                    where: {
                        email: data[0].email,
                        //  active: true
                    }
                })
                    .then(data2 => {
                        if (data2.length != 0) {
                            if (data2[0].active == true) {
                                models.entreprenuers.findAll({
                                    attributes: ['active'],
                                    where: {
                                        user_id: data2[0].id
                                    }
                                })
                                    .then(data3 => {
                                        models.investors.findAll({
                                            attributes: ['active'],
                                            where: {
                                                user_id: data2[0].id
                                            }
                                        })
                                            .then(data4 => {
                                                res.status(200)
                                                    .json({
                                                        user: data2,
                                                        entrepreneur: data3,
                                                        investor: data4,
                                                        Message: 'success',
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
                                    .catch(function (err) {
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
                                        Message: 'user not active',
                                        Successful: false
                                    });
                            }
                        }
                        else {
                            console.log("user exists but not subscribe or active")
                            res.status(200)
                                .json({
                                    Message: 'Successfully but user is not avtive or not subscribe',
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
            }
            else {
                console.log("user not found in session")

                res.status(200)
                    .json({
                        Message: 'Successfully but user not found in session',
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
//ready but not give to ali
// router.post('/User_Subs_Payment', (req, res, next) => {
//     let mac = req.body.data.Mac

//     models.session.findAll({
//         attributes: ['email'],
//         where: {
//             mac_address: mac,
//             status: true
//         }
//     })
//         .then(data => {
//             if (data.length != 0) {
//                 console.log("user found")
//                 models.users2.findAll({
//                     attributes: ['id', 'active'],
//                     where: {
//                         email: data[0].email,
//                         //  active: true
//                     }
//                 })
//                     .then(data2 => {
//                         if (data2.length != 0) {
//                             console.log("user is active")
//                             res.status(200)
//                                 .json({
//                                     Active: data2[0].active,
//                                     Message: 'Successfully',
//                                     Successful: true
//                                 });
//                         }
//                         else {
//                             console.log("user exists but not subscribe or active")
//                             res.status(200)
//                                 .json({
//                                     Message: 'Successfully but user is not avtive or not subscribe',
//                                     Successful: false
//                                 });
//                         }
//                     })
//                     .catch(function (err) {
//                         console.log("There is an error")
//                         res.status(404)
//                             .json({
//                                 Message: 'Failed' + err,
//                                 Successful: false
//                             });
//                     });
//             }
//             else {
//                 console.log("user not found in session")

//                 res.status(200)
//                     .json({
//                         Message: 'Successfully but user not found in session',
//                         Successful: true
//                     });
//             }

//         })
//         .catch(function (err) {
//             console.log("There is an error")
//             res.status(404)
//                 .json({
//                     Message: 'Failed' + err,
//                     Successful: false
//                 });
//         });

// })
//its ready but not given to Ali 
//It will be given when require
router.post('/User_Mode_Registeration', (req, res, next) => {
    let mac = req.body.data.Mac
    let mode = req.body.data.Mode
    let Inverstor = false
    let Entrepreneur = false
    models.session.findAll({
        attributes: ['email'],
        where: {
            mac_address: mac,
            status: true
        }
    })
        .then(data => {
            if (data.length != 0) {
                models.users2.findAll({
                    attributes: ['id'],
                    where: {
                        email: data[0].email
                    }
                })
                    .then(data1 => {
                        if (data1.length != 0) {
                            if (mode == 'Investor') {
                                models.investors.findAll({
                                    attributes: ['id'],
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data2 => {
                                        if (data2.length != 0) {
                                            Inverstor = true

                                            res.status(200)
                                                .json({
                                                    Type: true,
                                                    Message: 'Success',
                                                    Successful: true
                                                })
                                        }
                                        else {
                                            res.status(200)
                                                .json({
                                                    Type: false,
                                                    Message: 'Success Not Investor',
                                                    Successful: true
                                                })
                                        }
                                    }).catch(function (err) {
                                        res.status(404)
                                            .json({
                                                Message: 'Failed', err,
                                                Successful: false
                                            })
                                    })

                            }
                            else {
                                models.entreprenuers.findAll({
                                    attributes: ['id'],
                                    where: {
                                        user_id: data1[0].id
                                    }
                                })
                                    .then(data3 => {
                                        if (data3.length != 0) {
                                            //  Entrepreneur = true
                                            res.status(200)
                                                .json({
                                                    Type: true,
                                                    Message: 'Success',
                                                    Successful: true
                                                })
                                        }
                                        else {
                                            res.status(200)
                                                .json({
                                                    Type: false,
                                                    Message: 'Success not Entreprenuer',
                                                    Successful: true
                                                })
                                        }
                                    }).catch(function (err) {
                                        res.status(404)
                                            .json({
                                                Message: 'Failed', err,
                                                Successful: false
                                            })
                                    })


                            }

                        }
                        else {
                            res.status(404)
                                .json({
                                    Message: ' user  not exists in users currentrly',
                                    Successful: false
                                })
                        }
                    })

            }
            else {
                res.status(404)
                    .json({
                        Message: ' user  not login currentrly',
                        Successful: false
                    })
            }
        })
        .catch(function (err) {
            res.status(404)
                .json({
                    Message: 'Failed', err,
                    Successful: false
                })
        })
})
module.exports = router;