import { Router } from 'express'
import { body } from "express-validator"
import { getUserCart, getCartById, createUserCart, putProductsInCart,
         putQuantityProductsInCart, deleteCartProducts, deleteCartProduct }
        from '../controllers/cart.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

/** GET 
 * Deberá de traer solo el carrito con el ID de Usuario especificado
 * **/
router.get("/:uid", passportCall('jwt'), getUserCart)
/** GET 
 * Deberá de traer solo el carrito con el ID del mismo
 * **/
router.get("/:cid", passportCall('jwt'), getCartById)
/** POST 
 * Deberá de crear el Carrito único por ID de Usuario
 * **/
router.post("/", 
    [ body('user').notEmpty().withMessage('El campo usuario es requerido') ], 
    passportCall('jwt'), createUserCart
)
/** PUT 
 * Deberá de actualizar los productos asignados al Carrito de Usuario
 * **/
router.put("/:cid",
    [ body('products').notEmpty().withMessage('The field products is required') ], 
    passportCall('jwt'), authorization('user'), putProductsInCart
)
/** PUT 
 * Deberá de actualizar la Cantidad del Producto del Carrito
 * **/
router.put("/:cid/product/:pid",
    [ body('quantity').notEmpty().withMessage('The field quantity is required') ], 
    passportCall('jwt'), authorization('user'), putQuantityProductsInCart
)
/** DELETE 
 * Deberá de eliminar los productos del Carrito
 * **/
router.delete("/:cid", passportCall('jwt'), authorization('user'), deleteCartProducts)
/** DELETE 
 * Deberá de eliminar el producto del Carrito
 * **/
router.delete("/:cid/product/:pid", passportCall('jwt'), authorization('user'), deleteCartProduct)

// Exportando puntos de acceso
export default router