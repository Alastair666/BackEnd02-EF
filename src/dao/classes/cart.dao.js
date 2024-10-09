import cartsService from '../models/cart.model.js'
import userService from '../models/user.model.js'

export default class Cart {
    /**  
     * Deberá de traer solo el carrito con el ID de Usuario especificado
     * **/
    getUserCart = async(uid)=>{
        try {
            const userCart = await userService.findOne({ _id: uid })
            if (userCart) {
                const cart = await cartsService.findOne({ _id: userCart.cart })
                if (cart) {
                }
            }
        }
        catch (error){
            console.log(error)
            return null
        }
    }
}