const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const { authorization } = req.headers;

	// Make sure authorization token exists
	if (!authorization) return res.status(401).json({ error: "Authorization token required" });

	try {
		// Verify token with secret key
		const decoded = jwt.verify(authorization, process.env.SECRET_KEY);

		// Attach user info to request (TOKEN PAYLOAD)
		req.user = decoded;

		// Move to next middleware or route handler
		next();
	} catch (error) {
		// Catch any errors (most likely an invalid token)
		console.error(error);
		return res.status(401).json({ error: "Unauthorized request" });
	}
};

module.exports = verifyToken;
