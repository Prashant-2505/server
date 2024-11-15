const bcrypt = require('bcrypt');
const User = require('../models/User'); 
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

let secret = "123qwe"


async function signUp(req, res) {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = uuidv4(); // Generate a UUID for userId

        // Create a new user
        const user = await User.create({
            userId,
            name,
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign({ name: user.name, email: user.email }, secret);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user.userId, 
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


// Log-In function
async function logIn(req, res) {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered, please register"
            });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Bad credentials"
            });
        }

        const token = jwt.sign({name:user?.name,email:user?.email}, secret);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error("Error during log-in:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}



// Export the functions
module.exports = { signUp, logIn };
