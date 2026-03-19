const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(400).send({errors : [{msg : "Accès réservé aux administrateurs"}]});
     
  }
  next();
};

module.exports = isAdmin;