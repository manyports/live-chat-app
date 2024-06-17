import jwt from 'jsonwebtoken';

const tokengen = (userId, res) => {
    const token = jwt.sign({ userId }, "aKC6iqSWrO4nSW1w61OOGBUkdcJX8Amfj4FCMEf3ChM=", { expiresIn: "10d" });
    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: "strict"
    });
};

export default tokengen;
