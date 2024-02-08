const path = require("path");

const express = require("express");
const {regigster, sign_in  } = require("../services/userService");
const {loginRequired} = require("../middlewares/authMiddleware");

const router = express.Router();

// // Custom middleware function to serve static files with login protection
// function serveProtectedStatic(req, res, next) {
//   // Check if the user is logged in before serving static files
//   loginRequired(req, res, () => {
//       express.static(path.join(__dirname, 'main'))(req, res, next);
//   });
// }


router.use("/tasks", loginRequired, express.static(path.join(__dirname, '../static/main')))
router.route("/auth/regigster").post(regigster)
router.route("/auth/sign_in").post(sign_in);




module.exports = router;




