const db = require('../config/database')


const getAllTutors = async () => {
    const [rows] = await db.query(
        "SELECT * FROM tutor"
    )
    return rows
}

module.exports = { getAllTutors }