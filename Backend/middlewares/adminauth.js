import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
  try {
    const { admintoken } = req.cookies;

    if (!admintoken) {
      return res.status(401).json({ success: false, message: "Admin not logged in" });
    }

    const decoded = jwt.verify(admintoken, process.env.JWT_KEY);

    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access Denied. Admins only!" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default isAdmin;
