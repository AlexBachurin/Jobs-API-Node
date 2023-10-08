const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  //check auth headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // if token not provided then throw our own custom error
    throw new UnauthenticatedError("No token provided");
  }
  //if token provided
  const token = authHeader.split(" ")[1];

  //verify token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decodedToken;
    // setup user in request and pass it to next, then we will be able to
    // access user in jobs route
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this page");
  }
};

module.exports = authMiddleware;
