import jwt from "jsonwebtoken";

const isLoggedin = async (req, res, next) => {

   const userAuth = req.cookies.usertoken;

   let decoded;

  if ( !userAuth ) {
    return res.json({ success: false, message: "Unauthorized" });
  } else {
    try {
       if(userAuth){
               decoded = jwt.verify(userAuth, process.env.JWT_KEY)
               if(decoded.role!== "user"){
                return res.send({success: false, message: "User not authorized"})
               }
        }
        if (!decoded) return res.json({ success: false, message: "Something went wrong" });
        req.user = decoded;
        next()
    } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: "error happened" });
    }
  }
};

export default isLoggedin;
