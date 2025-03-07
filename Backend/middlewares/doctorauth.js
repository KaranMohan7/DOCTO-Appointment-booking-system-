import jwt from 'jsonwebtoken'

const isdoctor =  async (req,res,next) => {
    try {
        if(!req.cookies.doctortoken){
            return res.json({success: false, message: "Unauthorized"})
    } 
    const decoded =  jwt.verify(req.cookies.doctortoken, process.env.JWT_KEY);
    if(!decoded) return res.json({success: false, message: "Unauthorized error"})

        req.user = decoded;
       
        next();

}catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "error happened" });
    }
}

export default isdoctor