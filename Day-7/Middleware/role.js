// const role = (req, res, next) =>  {
//   if (req.url == "/salesdata" && req.role === "seller") {
//     next();
//   } else if (req.url == "/products" && req.role == "customer") {
//     next();
//   } 
//   else if (req.url == "/offers" && (req.role == "customer" || req.role =="seller")){
//     next()
//   }
//   else if (req.url == "/offers" && req.method == "patch" && (req.role == "seller")){
//     next()
//   }
//   else {
//     res.send("Unathorised");
//   }
// };

 // 1 endpoint = 4 methods
 // Suppose we have delete req should only be done by admin

//  This is clousers
// We will make this a normal function
 const role = (permittedRole) =>{
    // Middleware function
    return (req, res, next) => {
        const user_role = req.role
        
        if(permittedRole.includes(user_role)){
            next()
        }
        else{
            res.send("Unautherized")
        }
    }
 }


module.exports = { role };
