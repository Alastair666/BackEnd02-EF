import { validationResult } from 'express-validator'
import transport, { generateHTMLTicket } from '../config/mail.config.js'
import config from '../config/persistence.config.js'
import CartService from '../services/cart.service.js'

export const getUserCart = async(req,res)=>{
    try {
        const cart_uid = req.params.uid
        console.log(`User ID: ${cart_uid}`)
        if (cart_uid) {
            const cart = await CartService.getCartService().getUserCart(cart_uid)
            if (cart) {
                res.status(200).json({ result: "success", payload: cart })
            }
            else {
                res.status(400).json({ result: "error", errors: "There's no cart in the database" })
            }
        }
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ result: "error", errors: error.message })
    }
}
export const getCartById = async(req,res)=>{
    console.log(req.params)
    try {
        const cart_cid = req.params.cid
        //console.log(`Cart ID: ${cart_cid}`)
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
        console.error(error)
        res.status(400).json({ result: "error", errors: error.message })
    }//*/
}
export const createUserCart = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: error.array() });
        }
        const newCart = req.body
        // Insertando producto en BD
        let result = await CartService.getCartService().createUserCart(newCart.user)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(400).json({ result: "error", errors: error.message })
    }
}
export const putProductsInCart = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: error.array() });
        }
        const productsCart = req.body.products
        // Actualizando productos del carrito
        let result = await CartService.getCartService().putProductsInCart(cart_cid, productsCart)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ result: "error", errors: error.message })
    }
}
export const putQuantityProductsInCart = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const prod_pid = req.params.pid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: error.array() });
        }
        const quantity = req.body.quantity
        // Actualizando productos del carrito
        let result = await CartService.getCartService().putQuantityProductsInCart(cart_cid,  prod_pid, quantity)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(400).json({ result: "error", errors: error.message })
    }
}
export const deleteCartProducts = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: error.array() });
        }
        // Eliminando productos del carrito
        let result = await CartService.getCartService().deleteCartProducts(cart_cid)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(400).json({ result: "error", errors: error.message })
    }
}
export const deleteCartProduct = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        const prod_pid = req.params.pid
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: error.array() });
        }
        // Eliminando producto del carrito
        let result = await CartService.getCartService().deleteCartProduct(cart_cid, prod_pid)
        res.send({ result: "success", payload: result})
    }
    catch (error) {
        res.status(400).json({ result: "error", errors: error.message })
    }
}
export const purchaseCart = async(req,res)=>{
    try {
        const cart_cid = req.params.cid
        let cart = await  CartService.getCartService().purchaseCart(cart_cid)
        console.log(cart)
        if (cart) {
            let result = await transport.sendMail({
                from: config.sender,
                to:  cart.t.purchaser,
                subject: `Ticket #${cart.t.code}`,
                html: generateHTMLTicket(cart),
                attachments: []
            })
            res.send({ result: "success", payload: cart})
        }

        /*
        let products = []
        const cart = await CartService.getCartService().getCartById(cart_cid)
        if (cart) {
            for (const product of cart.products) {
                let prod = await ProductService.getProductService().getProductById(product.pid)
                if (prod) {
                    if (prod.stock >= product.quantity)
                        products.push({ p: prod, c: product })
                }
                else throw new Error("Can't find the product by ID:"+product.pid)
            }
        }
        else throw new Error("Can't find the cart by ID:"+cid)

        //Validando si hay productos disponibles
        console.log(products)
        if (products.length > 0){
            //
        }//*/
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ result: "error", errors: error.message })
    }
}