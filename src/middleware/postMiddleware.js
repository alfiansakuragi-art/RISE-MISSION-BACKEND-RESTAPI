require('dotenv').config()

const verifyPost = (req, res, next) => {
    const pass = req.headers.authorization


    try {
        if (!pass) {
            return res.status(400).json({
                message: "access denied, pass required",
                CODE: 'NO_PASS'
            })
        }
        const CheckPass = (pass) => {
            if (pass === process.env.POST_KEY) {
                return next()
            }
            return res.status(400).json({
                message: "PASS NOT MATCH",
                CODE: "WRONG PASS"
            })
        }
        CheckPass(pass)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'internal server error'
        })
    }

}

module.exports = { verifyPost }