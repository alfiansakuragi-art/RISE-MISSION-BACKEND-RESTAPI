const db = require('../config/database')

const getAllProducts = async () => {
    const [rows] = await db.query(
        "SELECT * FROM product"
    )
    return rows
}

const getProductById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM product WHERE id = ?", [id]
    )
    return rows[0]
}

const createNewProduct = async (category_id, tutor_id, author_id, title, description, picture, price) => {
    const [result] = await db.query(
        `INSERT INTO product (category_id, tutor_id, author_id, title, description, picture, price) VALUES(?,?,?,?,?,?,?)`,
         [category_id, tutor_id, author_id, title, description, picture, price]
    )
    return result
}

const deleteProductById = async(id) => {
    const [result] = await db.query(
        `DELETE FROM product WHERE id = ?`,[id]
    )
    return result
}

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    deleteProductById
}