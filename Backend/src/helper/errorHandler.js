// helper/errorHandler.js

/**
 * Formats Mongoose errors into a flat object (using the original name for backward compatibility)
 */
const formatSequelizeError = (res, error) => {
  let errors = {};
  if (error.name === "ValidationError") {
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return res.status(422).json({ status: false, errors });
  } else if (error.code === 11000) {
    const field = error.keyValue ? Object.keys(error.keyValue)[0] : "error";
    errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is already taken.`;
    return res.status(422).json({ status: false, errors });
  } else if (error.name === "CastError") {
    errors[error.path] = `Invalid format for ${error.path}`;
    return res.status(422).json({ status: false, errors });
  } else {
    return handle500(res, error);
  }
};

/**
 * Handles 404 Not Found errors
 */
const handle404 = (res, message = "Resource not found") => {
  return res.status(404).json({
    status: false,
    errors: {
      route: message
    }
  });
};

/**
 * Handles 401 Unauthorized errors (Token expired/Invalid)
 */
const handle401 = (res, message = "Session expired, please login again") => {
  return res.status(401).json({
    status: false,
    errors: {
      auth: message
    }
  });
};

/**
 * Handles 422 Internal Server errors
 */
const handle422 = (res, errors = {}) => {
  return res.status(422).json({
    status: false,
    errors 
  });
};

/**
 * Handles 500 Internal Server errors
 */
const handle500 = (res, error) => {
  console.error("Internal Server Error:", error);
  return res.status(500).json({
    status: false,
    errors: {
      server: error && error.message ? error.message : "Internal Server Error"
    }
  });
};

module.exports = {
  formatSequelizeError,
  formatMongooseError: formatSequelizeError, // Alias for clean code
  handle404,
  handle401,
  handle422,
  handle500
};
