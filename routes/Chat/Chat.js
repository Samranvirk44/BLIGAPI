
const express = require('express');
const router = express.Router();
const models = require('../../Modal/Modal');
const sequelize = require('sequelize');
const Op = sequelize.Op
router.post('/Create_Chat_Pair', (req, res, next) => {
    let contract_id = req.body.data.Contract_id
    models.company_investor.findAll({
        attributes: ['investor_id', 'company_id'],
        where: {
            id: contract_id
        }
    })
        .then(data => {
            if (data.length != 0) {
                models.company.findAll({
                    attributes: ['entre_id'],
                    where: {
                        id: data[0].company_id
                    }
                })
                    .then(data1 => {
                        if (data1.length != 0) {
                            models.entreprenuers.findAll({
                                attributes: ['user_id'],
                                where: {
                                    id: data1[0].entre_id
                                }
                            })
                                .then(data2 => {
                                    if (data2.length != 0) {
                                        models.investors.findAll({
                                            attributes: ['user_id'],
                                            where: {
                                                id: data[0].investor_id
                                            }
                                        })
                                            .then(data3 => {
                                                if (data3.length != 0) {
                                                    let values = [{
                                                        user1: data2[0].user_id,
                                                        user2: data3[0].user_id,
                                                        date_time: new Date()
                                                    }]
                                                    models.message_pair.findAll({
                                                        attributes: ['id'],
                                                        where: {
                                                            user1: values[0].user1,
                                                            user2: values[0].user2,
                                                        }
                                                    })
                                                        .then(data2 => {
                                                            models.message_pair.findAll({
                                                                attributes: ['id'],
                                                                where: {
                                                                    user1: values[0].user2,
                                                                    user2: values[0].user1,
                                                                }
                                                            })
                                                                .then(data3 => {
                                                                    if (data2.length == 0 && data3.length == 0) {
                                                                        models.message_pair.bulkCreate(values)
                                                                        res.status(200)
                                                                            .json({
                                                                                Sender_Reciever: values,
                                                                                CompanyTypes: data1,
                                                                                Message: 'Success',
                                                                                Successful: true
                                                                            })
                                                                    }
                                                                    else {
                                                                        res.status(200)
                                                                            .json({
                                                                                Message: 'Already in chat room',
                                                                                Successful: true
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
                                                            Message: 'user is not exists for Investor',
                                                            Successful: true
                                                        })
                                                }
                                            })
                                    }
                                    else {
                                        res.status(200)
                                            .json({
                                                Message: 'user is not exists for entreprenuer',
                                                Successful: true
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
                                    Message: 'Entre is not exists',
                                    Successful: true
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
                        Message: 'Contract is not exists',
                        Successful: true
                    })
            }
            ///
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
router.post('/Show_PairList', (req, res, next) => {
    //console.log("calling",req.body.data.U_Id)
    let id = req.body.data.U_Id
    let user_ides = []
    let user2_ides = []
    models.message_pair.findAll({
        attributes: ['user1', 'user2', 'date_time', 'id'],
        where: {
            [Op.or]: [{ user1: id }, { user2: id }]
        }
    })
        .then(data => {
            if (data.length != 0) {
                for (let index = 0; index < data.length; index++) {
                    user_ides.push(data[index].user1)

                }
                for (let index = 0; index < data.length; index++) {
                    user2_ides.push(data[index].user2)

                }
                var users = user_ides.concat(user2_ides)
                for (var i = 0; i < users.length; i++) {
                    if (users[i] == id) {
                        users.splice(i, 1);
                        i--
                    }
                }
                models.users2.findAll({
                    attributes: ['profile_pic', 'first_name'],
                    where: {
                        id: users
                    }
                })
                    .then(data1 => {
                        if (data1.length != 0) {
                            models.users2.findAll({
                                attributes: ['profile_pic', 'first_name'],
                                where: {
                                    id: id
                                }
                            })
                                .then(data2 => {
                                    if (data2.length != 0) {
                                        // console.log("data2=>",data2),
                                        // console.log("data1=>",data1),
                                        // console.log("data=>",data),
                                        res.status(200)
                                            .json({
                                                Userdata: data2,
                                                PairList: data1,
                                                Duration: data,
                                                Message: 'Successful',
                                                Successful: true
                                            })
                                    }
                                    else {
                                        res.status(200)
                                            .json({
                                                Message: 'Success..........there is no  this user',
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
                        } else {
                            res.status(200)
                                .json({
                                    Message: 'Success..........there is no data available for this user in user table',
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
            }
            else {
                res.status(200)
                    .json({
                        Message: 'Success..........there is no chat available for this user',
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
router.post('/Get_All_Messages', (req, res, next) => {

    let message_id = req.body.data.Pair_Id
    models.message_data.findAll({
        where: {
            message_pair_id: message_id
        }
    })
        .then(data => {
            if (data.length != 0) {
                res.status(200)
                    .json({
                        Chat: data,
                        Message: 'Success',
                        Successful: true
                    })

            }
            else {
                res.status(200)
                    .json({
                        Message: 'Failed,There is no messages',
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
module.exports = router
