let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();


//Image & multer
const multer = require('multer');
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, "../public/uploads");
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, file.originalname);
    },
  });
  
//upload parameters for multer
let  upload = multer({ storage: storage })

//Work Model
let  workSchema = require('../models/Work')

//Create Work
router.post('/create-work', upload.single('imageCover'), (req, res) => {
    console.log("reqCreate",req.body);
    const newWork = new workSchema({
        workname: req.body.workname,
        membertype: req.body.membertype,
        feature: req.body.feature,
        imageCover: req.file.originalname,
        subject: req.body.subject
    });
    console.log("newWork",newWork);
    console.log("newWorkXX",req.body);

    newWork
    .save()
    .then(() => res.json("New Work Created!"))
    .catch((error) => res.status(400).json("Error: ",error));
})

//Read Work 
router.route('/').get((req, res) => {
    workSchema.find((error, data) => {
        if (error){
            return next(error);
        }else{
            res.json(data);
        }
    })
})

// Get single work
router.route('/edit-work/:id').get((req, res) => {
    workSchema.findById(req.params.id, (error, data) => {
        if (error){
            return next(error);
        }else{
            res.json(data);
            console.log(data);
        }
    })
})

// Update work
router.put('/update-work/:id', upload.single('imageCover'), (req, res) => {
    workSchema.findById(req.params.id)
    .then((work) => {
        work.workname = req.body.workname;
        work.membertype = req.body.membertype;
        work.feature = req.body.feature;
        work.subject = req.body.subject;

        if (req.file != undefined) {
            work.imageCover = req.file.originalname
        }

        work
        .save()
        .then(() => {res.json("Work Update!")
        console.log("Work updated successfully");
        })
        .catch((error) => res.status(400).json("Error: ",error));
    })
    
})

// Delete work
router.route('/delete-work/:id').delete((req, res, next) => {
    workSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error){
            return next(error);
            console.log(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
