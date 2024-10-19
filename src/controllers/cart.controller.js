import { validationResult } from 'express-validator'
import CartService from '../services/cart.service.js'

export const getUserCart = async(req,res)=>{
    try {
        const cart_uid = req.params.uid
        if (cart_uid) {
            const userCart = await CartService.getCartService().getUserCart(cart_uid)
            if (userCart) {
                res.status(200).json({ result: "success", payload: cart })
            }
            else {
                res.status(400).json({ result: "error", errors: "There's no cart in the database" })
            }
        }
    }
    catch (error) {
        res.status(500).json({ result: "error", errors: error })
    }
}
export const getCartById = async(req,res)=>{
    try {
        const cart_cid = req.params.uid
        if (cart_cid) {
            const cart = await CartService.getCartService().getCartById(cart_cid)
            if (cart) {
                res.status(200).json({ result: "success", payload: cart })
            }
            else {
                res.status(400).json({ result: "error", errors: "There's no cart in the database" })
            }
        }
    }
    catch (error) {
        res.status(500).json({ result: "error", errors: error })
    }
}
export const createUserCart = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        const newCart = req.body
        // Insertando producto en BD
        let result = await CartService.getCartService().createUserCart(newCart.user)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(500).json({ result: "error", errors: error })
    }
}
export const putProductsInCart = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        const productsCart = req.body.products
        // Actualizando productos del carrito
        let result = await CartService.getCartService().putProductsInCart(cart_cid, productsCart)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(500).json({ result: "error", errors: error })
    }
}
export const putQuantityProductsInCart = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const prod_pid = req.params.pid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        const quantity = req.body.quantity
        // Actualizando productos del carrito
        let result = await CartService.getCartService().putQuantityProductsInCart(cart_cid,  prod_pid, quantity)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(500).json({ result: "error", errors: error })
    }
}
export const deleteCartProducts = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        // Eliminando productos del carrito
        let result = await CartService.getCartService().deleteCartProducts(cart_cid)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(500).json({ result: "error", errors: error })
    }
}
export const deleteCartProduct = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const prod_pid = req.params.pid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        // Eliminando producto del carrito
        let result = await CartService.getCartService().deleteCartProduct(cart_cid, prod_pid)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(500).json({ result: "error", errors: error })
    }
}