module.exports = (req, res, next) => {
  if (req.headers.auth_key != process.env.AUTH_KEY) {
  	throw new Error("Not authorized");
  }
  next()
}