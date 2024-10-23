import { Orders } from '../dao/factory.js'
import OrderRepository from '../repository/order.repository.js'

export default class OrderService {
    static getOrderService(){
        try {
            return new OrderRepository(new Orders())
        }
        catch (error) {
            console.log(error)
        }
    }
}