const mongoose = require('mongoose');
const Schema = mongoose.Schema 

let workSchema = new Schema({
    workname: {
        type: String,
        required: true
    },
    membertype: {
        type: String,
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    imageCover: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
},  {
    collection: "works"
})

module.exports = mongoose.model('Work', workSchema);