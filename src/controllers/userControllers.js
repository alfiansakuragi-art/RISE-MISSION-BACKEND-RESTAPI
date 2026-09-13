const { updateUser, getUserByEmail } = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const updateUserById = async (req, res) => {

    try {
        const { id } = req.params
        const { name } = req.body
        const { email } = req.body

        const result = await updateUser(name, email, id)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `id: ${id} not found`
            })
        }

        res.status(200).json({
            message: `id: ${id} berhasil di update => ${name}`,
            data: name
        })
    } catch (e) {
        res.status(500).json({
            message: "internal server error",
            error: e
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body || {}
        const user = await getUserByEmail(email)
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            });
        }


        if (!user) {
            return res.status(404).json({
                message: "email not found"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Unauthorized: invalid password"
            })
        }

        res.status(200).json({
            message: "success",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}
module.exports = {
    updateUserById,
    login
}
