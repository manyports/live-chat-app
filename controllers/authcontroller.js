import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import tokengen from "../utils/tokengen.js";

export const signup = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        if(!username || !email || !password){
            return res.status(400).json({error: "All fields are required"})
        }

        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error: "User already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password : hashedPassword});
        
        if(newUser){
            await tokengen(newUser._id, res);
            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email:  newUser.email
        });
    } else{
        res.status(400).json({error: "Invalid user data"});
    } 
}
    catch (error) {
        console.log("Error in signup", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid Credentials"})
        }

        tokengen(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });

    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"}); 
    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}