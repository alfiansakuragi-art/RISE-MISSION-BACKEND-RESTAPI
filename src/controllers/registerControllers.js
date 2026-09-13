const { createUser, getUserByEmail } = require('../models/userModels')
const bcrypt = require('bcrypt')

const requestRegister = async (req, res) => {
    const { name, email, password, role_id, phone_number, region } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)


        const result = await createUser(name, email, hashedPassword, role_id, phone_number, region)
        if (result) {
            return res.status(201).json({
                message: "success: user created"
            })
        }



        return res.status(500).json({
            message: "error: user not created",
            data: result
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}




module.exports = { requestRegister }