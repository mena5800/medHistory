const slugify = require("slugify");
const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const model = require("../models/recordModel");




// @desc create record
// @route POST /record
// @access private
exports.createRecord = asynchandler(async (req, res) => {
  const {name, description, imageUrl} = req.body;

  const record = await model.create({
    name: name,
    slug: slugify(name),
    description: description,
    imageUrl : imageUrl,
    patientId: req.user["_id"]
  });

  res.status(201).json({ data: record });
});


// @desc  get all records
// @route GET /records
// @access private
exports.getRecords = asynchandler(async (req, res) => {
  const limit = req.body.limit || 5;
  const page = req.body.page || 1;
  const skip = (page - 1) * limit;
  

  const records = await model.find({patientId: req.user["_id"]}).skip(skip).limit(limit)
  // .populate({path : 'category', select:"name -_id"}); // make another query --> not optmized because 2 queries

  res.status(200).json({results : records.length,  data: records });
});



// @desc  get specific record
// @route GET /records/:id
// @access Private
exports.getRecord = asynchandler( async(req, res, next)=>{
  const { id } = req.params;
  const record = await model.find({patientId: req.user["_id"], "_id": id});
  if (! record){
    return next(new ApiError("invalid record id", 404))
  }
  res.status(200).json({data : record});
})


exports.prepareUpdateObjectRecord = (req, res,next)=>{
  
  const object = {}
  const {name, description, imageUrl} = req.body;
  if (name) object["name"] = name;
  if (description) object["description"] = description;
  if (imageUrl) object["imageUrl"] = imageUrl

  req.updateObject = object

  next()

};

// @desc update specific record by id
// @route PUT /records/:id
// @access Private
exports.updateRecord = asynchandler(async (req, res, next) => {

  const { id } = req.params;
  const patientId = req.user["_id"];
  const record = await model.findOneAndUpdate(
    { _id: id, patientId:patientId},
    req.updateObject,
    { new: true } // tor return category after update not old one
  )

  if (!record) {
    return next(new ApiError("no record for this id", 404));
  }
  res.status(200).json({ data: record });
});

// @desc delete specific Record
// @route DELETE /records/:id
// @access Private

exports.deleteRecord = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user["_id"];

  const record = await model.findOneAndDelete(
    {
      _id : id,
      patientId : patientId
    }
    )

  if (!record) {
    return next(new ApiError("no record for this id", 404));
  }
  res.status(204).json({status : "ok"}); // 204 meaning delete success
});



