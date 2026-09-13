const jwt = require('jsonwebtoken')


const loginAuth = (req, res, next) => {

    // get token from request client

    const token = req.headers.authorization

    // return if not have token
    if (!token) {
        return res.status(401).json({
            message: "Access denied: No token provided",
            code: "NO_TOKEN"
        })
    }
    // verifying token
    const verifyToken = (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            return res.status(200).json({
                valid: true,
                data: decoded
            })
            
        } catch (e) {
            console.log(e)
            return res.status(401).json({
                message: "invalid token"
            })
        }
    }

    verifyToken(token)

}

module.exports = { loginAuth }