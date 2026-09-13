const express = require('express')

const { getProduct, getProducts, createProduct, deleteById } = require('../controllers/productControllers')
const { updateUserById, login } = require('../controllers/userControllers')
const { getTutors } = require('../controllers/tutorControllers')
const { loginAuth } = require('../middleware/loginAuth')
const { verifyPost } = require('../middleware/postMiddleware')
const { requestRegister } = require('../controllers/registerControllers')
const router = express.Router()

// CRUD


// IMPLEMENTASI GET => READ
router.get('/products', getProducts)



router.get('/tutors', getTutors)
router.get('/product/:id', getProduct)

// IMPLEMENTASI POST => CREATE
router.post('/product', verifyPost, createProduct)

//IMPLEMENTASI DELETE => DELETE
router.delete('/product/:id', verifyPost, deleteById)

//IMPLEMENTASI PATCH => UPDATE
router.patch('/user/:id', updateUserById)

//IMPLEMENTASI POST => REGISTER
router.post('/register', requestRegister)
//IMPLEMENTASI POST => LOGIN
router.post('/login', login)
module.exports = router