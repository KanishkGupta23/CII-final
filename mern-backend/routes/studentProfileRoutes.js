const express = require("express");
const router = express.Router();
const { updateStudentProfile, getStudentProfile } = require("../controllers/studentProfileController");
const upload = require("../middlewares/upload"); // Adjust path accordingly

// Route for updating student profile (with file upload)
router.post("/update", upload.fields([{ name: "resume" }, { name: "profilePic" }]), updateStudentProfile);

// Route for fetching a single student profile
router.get("/student/:userId", getStudentProfile); // Assuming you want to fetch by userId in the URL

module.exports = router;
