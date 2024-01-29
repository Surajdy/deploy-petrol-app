const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token,"secretcode",function(err,decode){
          if(err){
            console.log("not accessible")
            return res.send("login first")
        }else{
            next();
            return res.send("reports are accessable")
        }
  })
}
module.exports = {
  authenticateToken
};
