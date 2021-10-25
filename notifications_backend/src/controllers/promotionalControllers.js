'use strict';
var Promotional = require('../models/promotionalModel.js');
const fs = require("fs")
const {promisify} = require("util")
const pipeline = promisify(require("stream").pipeline)
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid')


exports.add_promotional= async (req, res,next) => {
    var fileName;
    const {file} = req
    if(file){
        if(file.detectedFileExtension != ".jpg" && file.detectedFileExtension != ".jpeg" && file.detectedFileExtension != ".png" ) next(new Error("invalid file type"))
        fileName = uuidv4() + file.detectedFileExtension
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../../public/${fileName}`)
            )
    }
 req.body['fileName'] = fileName
 Promotional.addPromotional(req.body, async (err, promotionalCreated) => {
 if (err) res.send({msg:"somthing faild"});
    if(promotionalCreated.affectedRows == 1){
         res.send({
            msg:"הזיכוי נרשם בהצלחה 🤩🤩🤩" 
        }) 
    }else{
        res.send({
            msg:"משהו השתבש😪😪" 
        }) 
    }
});
};
exports.get_last_month= (req, res) => {
Promotional.getLastMonth(async (err, data) => {
 if (err) res.send({msg:"somthing faild"});
    if(Object.keys(data).length > 0){
         res.send({
            data:data
        })
    }
});
};
exports.update_product_status = (req, res) => {


Promotional.updateProductStatus(req.body ,async (err, data) => {
 if (err) res.send({msg:"somthing faild"});
    if(data.affectedRows > 0){
         res.send({
            msg:"success"
        })
    }
});
};
exports.delete_product = (req, res) => {
Promotional.deleteProduct(req.body ,async (err, data) => {
 if (err) res.send({msg:"somthing faild"});
    if(data.affectedRows > 0){
         res.send({
            msg:"success"
        })
    }
});
};
