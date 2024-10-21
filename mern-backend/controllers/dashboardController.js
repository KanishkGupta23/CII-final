const mongoose = require("mongoose");
const {
  Industries,
  Openings,
  Institutes,
  Application,
  Profile,
} = require("../models/Industry");

const getDashboardCounts = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming your middleware adds the user to req

    // Fetch all industries
    const industries = await Industries.find({});

    // Find the industry related to the user by converting ObjectId to string
    const industry = industries.find((ind) => ind.user.toString() === userId);

    if (!industry) {
      return res.status(404).send("Industry not found for the user");
    }

    const applications = await Application.aggregate([
      {
        $lookup: {
          from: "openings", // join with the Openings collection
          localField: "openings",
          foreignField: "_id",
          as: "openingDetails",
        },
      },
      { $unwind: "$openingDetails" }, // Extract the matched opening details
      {
        $match: {
          "openingDetails.industry": industry._id, // Match only applications related to this industry
        },
      },
    ]);

    // Step 1: Get the Total Internships for this Industry
    const totalInternships = await Openings.countDocuments({
      industry: industry._id, // Count openings related to this industry
    });

    // Step 2: Total Applications from any Institute to this Industry
    const totalApplicationsFromInstitutes = await Application.countDocuments({
      openings: {
        $in: await Openings.find({ industry: industry._id }).distinct("_id"),
      },
    });

    // Step 3: Unique Institutes for this Industry
    const uniqueInstitutes = await Application.aggregate([
      {
        $lookup: {
          from: "openings",
          localField: "openings",
          foreignField: "_id",
          as: "openingDetails",
        },
      },
      { $unwind: "$openingDetails" },
      {
        $match: {
          "openingDetails.industry": industry._id,
        },
      },
      {
        $group: {
          _id: "$institute", // Group by institute to get unique institutes
          instituteDetails: { $first: "$institute" }, // Get unique institute
        },
      },
      {
        $lookup: {
          from: "institutes",
          localField: "instituteDetails",
          foreignField: "_id",
          as: "instituteData",
        },
      },
      { $unwind: "$instituteData" },
      { $project: { name: "$instituteData.name", _id: 0 } },
    ]);

    // Step 4: Total number of unique students applied to the openings of this industry
    const totalStudents = await Application.aggregate([
      {
        $lookup: {
          from: "openings",
          localField: "openings",
          foreignField: "_id",
          as: "openingDetails",
        },
      },
      { $unwind: "$openingDetails" },
      {
        $match: {
          "openingDetails.industry": industry._id,
        },
      },
      {
        $group: {
          _id: "$user", // Group by the user (student) to get unique students
          studentDetails: { $first: "$user" },
        },
      },
      {
        $lookup: {
          from: "users", // Assuming User schema is stored as 'users' collection
          localField: "studentDetails",
          foreignField: "_id",
          as: "studentData",
        },
      },
      { $unwind: "$studentData" },
      { $project: { name: "$studentData.name", _id: 0 } }, // Get unique student names
    ]);

    // Step 5: Count students by application status (approved, rejected, waiting)
    const applicationStatusCounts = await Application.aggregate([
      {
        $lookup: {
          from: "openings",
          localField: "openings",
          foreignField: "_id",
          as: "openingDetails",
        },
      },
      { $unwind: "$openingDetails" },
      {
        $match: {
          "openingDetails.industry": industry._id,
        },
      },
      {
        $group: {
          _id: "$status", // Group by application status
          count: { $sum: 1 }, // Count each application by status
        },
      },
    ]);

    const applicationCountsByInstitution = await Application.aggregate([
      { $group: { _id: "$institute", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "institutes",
          localField: "_id",
          foreignField: "_id",
          as: "instituteDetails",
        },
      },
      { $unwind: "$instituteDetails" },
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "institute",
          as: "studentCounts",
        },
      },
      {
        $project: {
          institute: "$instituteDetails.name",
          applicationCount: "$count",
          studentCount: { $size: "$studentCounts" }, // Count of students for the institute
        },
      },
    ]);

    // Step 6: Return data as response
    return res.json({
      totalInternships, // New data: Total internships for this industry
      totalApplicationsFromInstitutes, // New data: Total applications from any institute
      totalApplications: applications.length,
      uniqueInstitutes: uniqueInstitutes.length,
      totalStudents: totalStudents.length,
      applicationStatusCounts,
      applicationCountsByInstitution,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getDashboardCounts,
};
