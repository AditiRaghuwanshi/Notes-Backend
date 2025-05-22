// import jwt from "jsonwebtoken";


// const authenticateToken = (req,res,next) => {

//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if(!token) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(401);
//         req.user = user;
//         next();
//     });



// }

// export default authenticateToken;










import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
 

  if (!token) {
    return res.status(401).json({ error: true, message: "No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Invalid token" });
    }

    req.user = decoded; // ✅ so req.user.id is available
    next();
  });
};

export default authenticateToken;
