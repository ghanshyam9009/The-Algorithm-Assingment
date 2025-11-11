import User from "../Models/User.js";
import File from "../Models/File.js";
import Organization from "../Models/Organization.js";


export const usersByOrganization = async (req, res) => {
  try {
    const pipeline = [
      // Step 1: Lookup users for each organization
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "organizationId",
          as: "users",
        },
      },
      // Step 2: Project org info and count users
      {
        $project: {
          _id: 0,
          organizationId: "$_id",
          organizationName: "$name",
          count: { $size: "$users" }, // count users array
        },
      },
      // Step 3: Optionally sort alphabetically
      {
        $sort: { organizationName: 1 },
      },
    ];

    const result = await Organization.aggregate(pipeline);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in usersByOrganization:", err);
    res.status(500).json({ message: err.message });
  }
};

export const organizationFiles = async (req, res) => {
  try {
    const pipeline = [
      // Join users with their uploaded files
      {
        $lookup: {
          from: "users",
          localField: "uploadedBy",
          foreignField: "_id",
          as: "user",
        },
      },
      // Keep user info if available
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Join organizations
      {
        $lookup: {
          from: "organizations",
          localField: "user.organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
      {
        $unwind: {
          path: "$organization",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Group by organization
      {
        $group: {
          _id: "$organization._id",
          organizationName: { $first: "$organization.name" },
          totalFiles: { $sum: 1 },
          users: { $addToSet: "$user.name" },
        },
      },
      // Clean output
      {
        $project: {
          _id: 0,
          organizationId: "$_id",
          organizationName: 1,
          totalFiles: 1,
          users: {
            $filter: {
              input: "$users",
              as: "user",
              cond: { $ne: ["$$user", null] },
            },
          },
        },
      },
    ];

    const result = await File.aggregate(pipeline);
    if (result.length === 0) {
      return res.status(200).json({ message: "No organization file data found", data: [] });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error in organizationFiles aggregation:", err);
    res.status(500).json({ message: err.message });
  }
};
