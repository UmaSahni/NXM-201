var jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization
   
  try {
    if(token){
        let extractToken = token.split(" ")[1]
        var decoded = jwt.verify(extractToken, 'masai');
        // console.log(decoded)
        next()
    }
    else{
        res.send({"msg":"Token not found"})
    }
  } catch (error) {
    res.send({ msg: "Error in auth middleware" });
  }
};

module.exports = { auth };
