import { Carts } from '../dao/factory.js'
import CartRepository from '../repository/cart.repository.js'

export default class CartService {
    static getCartService(){
        try {
            return new CartRepository(new Carts())
        }
        catch (error) {
            console.log(error)
        }
    }
}