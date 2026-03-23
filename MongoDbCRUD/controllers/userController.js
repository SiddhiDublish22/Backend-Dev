import user from "../model/UserSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await user.find();

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {
    console.log("Error fetching users:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};