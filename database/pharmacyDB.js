const { randomUUID } = require('crypto');
const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    id : {type :String,default:randomUUID},
    name: { type: String, required: true }, 
    PhoneNumber : {type : String, required : true},
    email : {type :String , require : true},
    password : {type: String , require : true},
    location : {type:String , require : true},
    retailLicenceNumber : {type:String , require : true},
    // adharNumber : {type:String , require :true},
    // GSTIN : {type:String , require:true}
},{collection:"pharmacyInfo"});

const Pharmacy = mongoose.model('pharmacyInfo',pharmacySchema);

module.export = Pharmacy;