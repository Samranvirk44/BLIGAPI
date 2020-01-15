//var db=require('../../connection')
var models = require('../../Modal/Modal')
const express = require('express');
const router = express.Router();
var multer = require('multer');
router.use(express.static('./Images')); //it makes static folder

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './Images')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}${Date.now()}${file.originalname}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/UploadImages', upload.array('photo', 3), (req, res) => {
    console.log("uploaded is running image.")
    var urlpath = "ec2-18-222-128-84.us-east-2.compute.amazonaws.com/" + req.files[0].filename;
    res.status(200)
        .json({
            uri: urlpath,
            Successful: true
        })
})
router.post('/Uploadimg_Table', (req, res) => {
    console.log("uploaded is running image.")
    var values = req.body.data.values
    models.images.bulkCreate(values)
        .then(() => {
            res.status(200)
                .json({
                    Message: 'Succesful',
                    Successful: false
                });
        })
        .catch(function (err) {
            res.status(404)
                .json({
                    Message: 'Failed' + err,
                    Successful: false
                });
        })
    console.log("lala")
})


module.exports = router;