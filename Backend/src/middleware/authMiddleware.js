const { verifyToken } = require('../helper/authHelper');
const { handle401 } = require('../helper/errorHandler');

/**
 * Authentication Middleware
 * Checks for JWT token in Authorization header
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return handle401(res, "No token provided, access denied");
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return handle401(res, "Invalid or expired token");
  }

  // Attach user data to request object
  req.user = decoded;
  next();
};

/**
 * Role Authorization Middleware
 * Verifies if logged in user has one of the allowed roles
 */
const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: false,
        message: 'Access Denied: You do not have permission to access this resource.'
      });
    }
    next();
  };
};

/**
 * Optional Authentication Middleware
 * Attaches user if token is valid, but allows unauthenticated requests through
 */
const optionalAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) req.user = decoded;
  }
  next();
};

module.exports = {
  authenticateToken,
  optionalAuthenticateToken,
  requireRole,
};
