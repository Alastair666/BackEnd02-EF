import ticketModel from '../models/ticket.model.js'
import orderModel from '../models/order.model.js'

export default class OrderDB {
    /**  
     * Crea la orden de compra
     * **/
    createTicketOrder = async(tid, details)=>{
        try {
            const ticket = await ticketModel.findById(tid)
            if (ticket) {
                if (details.length > 0) {
                    const order = await orderModel.create({
                        ticket: tid,
                        details: details
                    }, {  new: true })
                    return order
                }
                else throw new Error("There's no details in the order")
            }
            else throw new Error("Can't find the ticket by ID:"+tid)
        }
        catch (error){
            console.log(error)
            throw new Error('Error create Order: ' + error.message)
        }
    }
}