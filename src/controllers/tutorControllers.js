const { getAllTutors } = require('../models/tutorModels')

const getTutors = async(req , res) => {
    try {
        const result = await getAllTutors()

        res.status(200).json({
            message: "OK",
            data: result
        })
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = {getTutors}