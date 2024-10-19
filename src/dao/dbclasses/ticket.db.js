import ticketModel from "../models/ticket.model.js";

export default class TicketDB {
    /**  
     * Crea un nuevo Ticketo
     * **/
    createTicket = async(ticket)=>{
        try {
            const newTicket = await ticketModel.create(ticket);
            return newTicket
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Obtiene el Ticket especificado
     * **/
    getTicketById = async(tid)=>{
        try {
            const Ticket = await ticketModel.findById(tid);
            return Ticket
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Obtiene los Tickets de la BD
     * **/
    getTickets = async(limit)=>{
        try {
            const tickets = await ticketModel.find();
            if (limit)
                tickets.limit(limit)
            return tickets
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Actualiza e Ticket especificado
     * **/
    updateTicket = async(tid, Ticket)=>{
        try {
            const updateTicket = await ticketModel.findOne({ _id: tid}, { $set: Ticket});
            return updateTicket
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    /**  
     * Elimina el Ticket especificado
     * **/
    deleteTicket = async(tid)=>{
        try {
            const ticket = await ticketModel.findById(tid)
            if (Ticket){
                let result = await ticket.deleteOne({ _id: tid })
                return result
            }
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
}