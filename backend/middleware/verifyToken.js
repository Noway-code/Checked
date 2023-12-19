const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) return res.status(401).json({ error: "Authorization token required" });

	try {
		const decoded = jwt.verify(authorization, process.env.SECRET_KEY);

		req.user = decoded;

		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: "Unauthorized request" });
	}
};

module.exports = verifyToken;
