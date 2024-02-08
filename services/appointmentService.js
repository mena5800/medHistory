const slugify = require("slugify");
const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const model = require("../models/appointmentModel");




// @desc create appointment
// @route POST /appointment
// @access private
exports.createAppointment = asynchandler(async (req, res) => {
  const {title, description, startDateTime, location} = req.body;

  const appointment = await model.create({
    title: title,
    slug: slugify(title),
    description: description,
    startDateTime : startDateTime,
    location : location,
    patientId: req.user["_id"]
  });

  res.status(201).json({ data: appointment });
});


// @desc  get all appointments
// @route GET /appointments
// @access private
exports.getAppointments = asynchandler(async (req, res) => {
  const limit = req.body.limit || 5;
  const page = req.body.page || 1;
  const skip = (page - 1) * limit;
  

  const appointments = await model.find({patientId: req.user["_id"]}).skip(skip).limit(limit)
  // .populate({path : 'category', select:"name -_id"}); // make another query --> not optmized because 2 queries

  res.status(200).json({results : appointments.length,  data: appointments });
});



// @desc  get specific appointment
// @route GET /appointments/:id
// @access Private
exports.getAppointment = asynchandler( async(req, res, next)=>{
  const { id } = req.params;
  const appointment = await model.find({patientId: req.user["_id"], "_id": id});
  if (! appointment){
    return next(new ApiError("invalid appointment id", 404))
  }
  res.status(200).json({data : appointment});
})


exports.prepareUpdateObjectAppointment = (req, res,next)=>{
  
  const object = {}
  const {title, description, startDateTime, location} = req.body;
  if (title) object["title"] = title;
  if (description) object["description"] = description;
  if (startDateTime) object["startDateTime"] = startDateTime;
  if (location) object["location"] = location;

  req.updateObject = object

  next()

};

// @desc update specific appointment by id
// @route PUT /appointments/:id
// @access Private
exports.updateAppointment = asynchandler(async (req, res, next) => {

  const { id } = req.params;
  const patientId = req.user["_id"];
  const appointment = await model.findOneAndUpdate(
    { _id: id, patientId:patientId},
    req.updateObject,
    { new: true } // tor return category after update not old one
  )

  if (!appointment) {
    return next(new ApiError("no appointment for this id", 404));
  }
  res.status(200).json({ data: appointment });
});

// @desc delete specific appointment
// @route DELETE /appointments/:id
// @access Private

exports.deleteAppointment = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const patientId = req.user["_id"];

  const appointment = await model.findOneAndDelete(
    {
      _id : id,
      patientId : patientId
    }
    )

  if (!appointment) {
    return next(new ApiError("no appointment for this id", 404));
  }
  res.status(204).json({status : "ok"}); // 204 meaning delete success
});



