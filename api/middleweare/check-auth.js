const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization;
        const decoded = jwt.verify(req.body.token, "rika");
        req.userData = decoded;
        next()
    } catch(error) {
        return res.status(500)({
            message: "auth failed"
        })
    }
}