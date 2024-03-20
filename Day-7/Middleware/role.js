const role = (req, res, next) => {
  if (req.url == "/salesdata" && req.role === "seller") {
    next();
  } else if (req.url == "/products" && req.role == "customer") {
    next();
  } 
  else if (req.url == "/offers" && (req.role == "customer" || req.role =="seller")){
    next()
  }
  else if (req.url == "/offers" && req.method == "patch" && (req.role == "seller")){
    next()
  }
  else {
    res.send("Unathorised");
  }
};

// 1 endpoint = 4 methods
// Suppose we have delete req should only be done by admin




module.exports = { role };
