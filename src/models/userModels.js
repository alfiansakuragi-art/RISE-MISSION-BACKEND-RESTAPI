const db = require('../config/database')


const updateUser = async (name, email, id) => {
    const [result] = await db.query(
        `UPDATE user SET name = ?, email = ? WHERE id = ?`,
        [name, email, id]
    )
    return result
}


const createUser = async (name, email, hashedPassword, role_id, phone_number, region) => {
    const [result] = await db.query(
        'INSERT INTO user (name , email, password, role_id, phone_number, region) VALUES (?,?,?,?,?,?)',
        [name, email, hashedPassword, role_id, phone_number, region]
    )
    return result
}

const getUserByEmail = async (email) => {
    const [result] = await db.query(
        'SELECT id, email, name, password FROM user WHERE email = ?',
        [email]
    )
    return result[0]
}
module.exports = { updateUser, createUser, getUserByEmail }