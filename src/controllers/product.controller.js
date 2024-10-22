import { validationResult } from 'express-validator'
import ProductService from '../services/product.service.js'

export const getProducts = async(req,res)=>{
    try {
        let limit = parseInt(req.query.limit)
        const result = await ProductService.getProductService().getProducts(limit)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "No products here" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const getProductById = async(req,res)=>{
    try {
        let { pid } = req.params
        const result = await ProductService.getProductService().getProductById(pid)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "No products here" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const createProduct = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(401).json({ result: "error", errors: errores.array() });
        }
        const newProduct = req.body
        // Insertando producto en BD
        const result = await ProductService.getProductService().createProduct(newProduct)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the product" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const updateProduct = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        // Obteniendo ID del producto y parametros para actualizar
        let { pid } = req.params
        let productToReplace = req.body
        // Editando producto en BD
        const result = await ProductService.getProductService().updateProduct(pid, productToReplace)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't update the product" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const manageStockProduct = async(req,res)=>{
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() })
        }
        // Obteniendo ID del producto y parametros para actualizar
        let { pid } = req.params
        let quantity = req.body.quantity
        let add = quantity > 0 ? true : false, minus = quantity <= 0 ? true : false
        // Editando producto en BD
        const result = await ProductService.getProductService().manageStockProduct(pid, Math.abs(quantity), add, minus)
        if (result)
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't update the product" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const deleteProduct = async(req,res)=>{
    try {
        let { pid } = req.params
        // Eliminando producto en BD
        const result = await ProductService.getProductService().deleteProduct(pid)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't delete the product" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}