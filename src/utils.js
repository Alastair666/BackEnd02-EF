import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "path"
import fs from 'fs';
import productsModel from "./dao/models/product.model.js"

/**  
 * Función encargada de la carga inicial en productos en caso de no existir
 * **/
export async function insertBaseProducts() {
    try {
        // Validando si hay productos insertados
        const productsBD = await productsModel.find()
        if (productsBD.length === 0){
            console.log("There's no products in database")
            // Sino hay leyendo productos base de DATA
            const filePath = path.resolve('src/data/products.json');
            const data = fs.readFileSync(filePath, 'utf8');
            const prodsBase = JSON.parse(data)
            if (prodsBase){
                const result = await productsModel.insertMany(prodsBase)
                console.log("Products inserted in database")
            }
            else
                console.log("There's no products in JSON file")
        }
        else 
            console.log(`There's ${productsBD.length} product(s) in database`)
    }
    catch (error) {
        console.error(error)
    } 
}
// Helper de Handlebars
export function ifEquals(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
}
// Incrementa 1 valor
export function inc(value) {
    return parseInt(value) + 1;
}

// Exportando DIR para manejo de directorios y accesos
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname