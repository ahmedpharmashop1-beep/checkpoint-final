const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]

    if (!token) {
return res.status(400).send({errors : [{msg : "Token is missing"}]});    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findOne({ _id: decoded.id });

    if (!foundUser) {
      return res.status(400).send({errors : [{msg : "Invalid token"}]});    

    }
    
    req.user = foundUser;
    next();


  } catch (error) {
    res.status(400).send({errors : [{msg : "Authentication failed"}]});  }
};

 

module.exports = isAuth;