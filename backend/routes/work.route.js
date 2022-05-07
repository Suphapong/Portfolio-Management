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
let  multipleUploads = upload.fields([
    {name: 'imageCover'}, 
    {name: 'moreImage', maxCount: 5},
    {name: 'pdf', maxCount: 1}
])

//Work Model
let  workSchema = require('../models/Work')

//Create work upload.single('imageCover')
router.post('/create-work', multipleUploads , (req, res) => {
    if (req.files) {
        console.log("reqFilesXXX",req.files);
        console.log("reqFiles",req.files.imageCover[0].originalname);
        let fileopt = req.body.fileOption;

        if (fileopt == "moreimage") {
            const newWork = new workSchema({
                workname: req.body.workname,
                membertype: req.body.membertype,
                feature: req.body.feature,
                imageCover: req.files.imageCover[0].originalname,
                subject: req.body.subject,
                description: req.body.description,
                fileOption: req.body.fileOption,
                moreImage: req.files.moreImage[0].originalname,
                pdf: req.files.pdf[0].originalname
            });
            newWork
            .save()
            .then(() => res.json("New Work Created!"))
            .catch((error) => res.status(400).json("Error: ",error));
        }else if (fileopt == "pdf") {
            const newWork = new workSchema({
                workname: req.body.workname,
                membertype: req.body.membertype,
                feature: req.body.feature,
                imageCover: req.files.imageCover[0].originalname,
                subject: req.body.subject,
                description: req.body.description,
                fileOption: req.body.fileOption,
                pdf: req.files.pdf[0].originalname
            });
            newWork
            .save()
            .then(() => res.json("New Work Created!"))
            .catch((error) => res.status(400).json("Error: ",error));
        }else if (fileopt == "both") {
            const newWork = new workSchema({
                workname: req.body.workname,
                membertype: req.body.membertype,
                feature: req.body.feature,
                imageCover: req.files.imageCover[0].originalname,
                subject: req.body.subject,
                description: req.body.description,
                fileOption: req.body.fileOption,
                moreImage: req.files.moreImage[0].originalname,
                pdf: req.files.pdf[0].originalname
            });
            newWork
            .save()
            .then(() => res.json("New Work Created!"))
            .catch((error) => res.status(400).json("Error: ",error));
        }
    }
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
router.put('/update-work/:id', multipleUploads, (req, res) => {
    console.log("YYYYYYYYYYYYYYYYYYYYYY");  
    console.log("XXXXXXXXXXXXXXXXXXXx",req.files);  
    workSchema.findById(req.params.id)
    .then((work) => {
        let fileopt = req.body.fileOption;
        let editFiles = req.body.editFiles;
        work.workname = req.body.workname;
        work.membertype = req.body.membertype;
        work.feature = req.body.feature;
        work.subject = req.body.subject;
        work.description = req.body.description;
        work.fileOption = req.body.fileOption;
        if (req.files != undefined) {
            if (editFiles == 1) {
                work.imageCover = req.files.imageCover[0].originalname;
            }

            if (fileopt == "moreimage" && editFiles == 2) {
                work.moreImage = req.files.moreImage[0].originalname;
            }else if (fileopt == "pdf" && editFiles == 2) {
                work.pdf = req.files.pdf[0].originalname;
            }else if (fileopt == "both" && editFiles == 2) {
                work.moreImage = req.files.moreImage[0].originalname;
                work.pdf = req.files.pdf[0].originalname
            }
        }

        work
        .save()
        .then(() => {res.json("Work Update!")
        console.log("Work updated successfully");
        })
        //.catch((error) => res.status(400).json("Error: ",error));
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
