const { getAllProducts, getProductById, createNewProduct, deleteProductById } = require('../models/productModels')

const getProducts = async (req, res) => {
    try {
        const result = await getAllProducts()

        res.status(200).json({
            message: "data berhasil diterima",
            data: result
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getProductById(id)

        if (!result) {
            return res.status(404).json({
                message: `id: ${id} not found`
            })
        }

        res.status(200).json({
            message: "data berhasil diterima",
            data: result
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const data = req.body
        const result = await createNewProduct(
            data.category_id,
            data.author_id,
            data.tutor_id,
            data.title,
            data.description,
            data.picture,
            data.price
        )
        res.status(201).json({
            message: "data udah berhasil diterima",
            data: `id: ${result.insertId}`
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id

        const result = await deleteProductById(id)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `id: ${id} tidak ditemukan`
            })
        }

        res.status(202).json({
            message: `id ${id} telah dihapus dari database`
        })
    } catch (e) {
        res.status(500).json({
            message: "internal server error",
            data: e
        })
    }
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    deleteById
}