import { Products } from '../dao/factory.js'
import ProductRepository from '../repository/product.repository.js'

export default class ProductService {
    static getProductService(){
        try {
            return new ProductRepository(new Products())
        }
        catch (error) {
            console.log(error)
        }
    }
}