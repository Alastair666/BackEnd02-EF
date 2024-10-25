import express from "express"
import productsModel from '../dao/models/product.model.js'
import cartsModel from "../dao/models/cart.model.js"

const router = express.Router()

// Ruta Inicial de Indexación de la Página de inicio
router.get("/", (req,res)=>{
    res.render('index')
})//*/

/*********************** PRODUCTS ***********************/
/** GET 
 * Deberá de traer todos los productos de la base (Incluyendo la limitación ?limit del desafio)
 * **/
router.get("/products", async (req,res)=>{
    try {
        // Determinando URI sin importar el servidor donde se encuentre
        const mainURI = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        let url = mainURI.split("?")
        let uri = url[0]
        // Definiendo filtros y opciones
        const filtros = {}, opciones = {}
        const { limit = 10, page = 1, sort, status = true } = req.query
        // Filtros
        if (status)
            filtros.status = status
        // Opciones
        opciones.limit = limit
        opciones.page = page
        if (!sort)
            opciones.sort = "asc"
        opciones.lean = true

        // Obteniendo datos de BD
        let retorno
        let result = await productsModel.paginate(filtros, opciones)
        if (result) {
            retorno = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalDocs,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `${uri}?page=${result.prevPage}` : "",
                nextLink: result.hasNextPage ? `${uri}?page=${result.nextPage}` : ""
            }
        }
        else {
            retorno = {
                status: "error",
                payload: {},
                totalPages: 0,
                prevPage: "",
                nextPage: "",
                page: 0,
                hasPrevPage: false,
                hasNextPage: false,
                prevLink: "",
                nextLink: ""
            }
        }
        //res.status(200).json(retorno)
        res.render('products', retorno)
    }
    catch (error) {
        res.status(500).json({ status: "error", payload: null, errors: error })
    }
})

/*********************** CARTS ***********************/
router.get("/carts/:cid", async(req,res)=>{
    try {
        let retorno
        const cid = req.params.cid
        if (cid){
            let result = await cartsModel.find({ _id: cid }).populate("products.product")
            if (result){
                let productos_vista = []
                result.forEach(ps=>{
                    ps.products.forEach(p=>{
                        const newProduct = {
                            _id: p.product._id,
                            title: p.product.title,
                            code: p.product.code,
                            price: p.product.price,
                            quantity: p.quantity
                        }
                        productos_vista.push(newProduct)
                    })
                })
                retorno = {
                    status: "success",
                    payload: productos_vista
                }
            }
            else {
                retorno = {
                    status: "error",
                    payload: products
                }
            }
        }
        else {
            res.status(400).json({ status: "error", errors: `There's no cid param in the request` })
        }
        //res.status(200).json(retorno)
        res.render('carts', retorno)
    }
    catch (error) {
        res.status(500).json({ status: "error", payload: null, errors: error })
        console.log(error)
    }
})

// Exportando 
export default router