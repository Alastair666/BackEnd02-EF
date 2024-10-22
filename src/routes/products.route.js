import { Router } from 'express'
import { body } from "express-validator"
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, manageStockProduct }
        from '../controllers/product.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

/** GET 
 * Deberá de traer todos los productos de la base (Incluyendo la limitación ?limit del desafio)
 * **/
router.get("/", getProducts)
/** GET 
 * Deberá de traer solo el producto con el ID especificado
 * **/
router.get('/:pid', getProductById)
/** POST 
 * Deberá agregar un nuevo producto con los campos
 * **/
router.post('/',
    [
        body('title').notEmpty().withMessage('El campo title es requerido'),
        body('description').notEmpty().withMessage('El campo description es requerido'),
        body('code').notEmpty().withMessage('El campo code es requerido'),
        body('status').notEmpty().withMessage('El campo status es requerido'),
        body('price').notEmpty().withMessage('El campo price es requerido'),
        body('stock').notEmpty().withMessage('El campo stock es requerido'),
        body('category').notEmpty().withMessage('El campo category es requerido')
    ], passportCall('jwt'), authorization('admin'), createProduct
)
/** PUT 
 * Deberá agregar un nuevo producto con los campos
 * **/
router.put('/:pid', 
    [
        body('title').notEmpty().withMessage('El campo title es requerido'),
        body('description').notEmpty().withMessage('El campo description es requerido'),
        body('code').notEmpty().withMessage('El campo code es requerido'),
        body('status').notEmpty().withMessage('El campo status es requerido'),
        body('price').notEmpty().withMessage('El campo price es requerido'),
        body('stock').notEmpty().withMessage('El campo stock es requerido'),
        body('category').notEmpty().withMessage('El campo category es requerido')
    ], passportCall('jwt'), authorization('admin'), updateProduct
)
/** PUT 
 * Deberá agregar actualizar el stock del producto
 * **/
router.put('/:pid/quantity', passportCall('jwt'), authorization('admin'), manageStockProduct)
/** DELETE 
 * Deberá de traer solo el producto con el ID especificado
 * **/
router.delete('/:pid', passportCall('jwt'), authorization('admin'), deleteProduct)

// Exportando puntos de acceso
export default router