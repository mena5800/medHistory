const express = require("express");

const {createRecord, getRecords, getRecord, updateRecord,prepareUpdateObjectRecord, deleteRecord } = require("../services/recordService");
const {loginRequired} = require("../middlewares/authMiddleware");

const { getRecordValidator, createRecordValidator,updateRecordValidator, deleteRecordValidator } = require("../utils/validators/recordValidator")

// access params of another routes mergeparams: true
const router = express.Router({ mergeParams : true});



router.route("/records").post(loginRequired, createRecordValidator, createRecord).get(loginRequired, getRecords)
router.route("/records/:id").get(loginRequired, getRecordValidator, getRecord).put(loginRequired, updateRecordValidator, prepareUpdateObjectRecord, updateRecord).delete(loginRequired, deleteRecordValidator, deleteRecord)


module.exports = router;
