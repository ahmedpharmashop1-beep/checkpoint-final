const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { firstname, name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({errors : [{msg : "Email already exists"}]});  
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
 
    
    const newUser = new User({...req.body });
    newUser.password = hashedPassword;
    await newUser.save();
     
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }); 
      res.status(200).send({success : [{msg : "User registered successfully"}], token, user: newUser})
      


  
  } catch (error) {
    res.status(400).send({errors : [{msg : "User registration failed"}]});
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({errors : [{msg : "Invalid email or password"}]});
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password); 
    if (!checkPassword) {
      return res.status(400).send({errors : [{msg : "Invalid password"}]});
    }
    const token = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );
    res.status(200).send({success : [{msg : "User logged in successfully"}], token, user: foundUser });
  }
    catch (error) {
    res.status(400).send({errors : [{msg : "User login failed"}]});
  }
};
