import User from "../models/usermodel.js"; 
 
 export const SidebarUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in SidebarUsers controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}