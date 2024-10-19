import { Tickets } from '../dao/factory.js'
import TicketRepository from '../repository/ticket.repository.js'

export default class TicketService {
    static getTicketService(){
        try {
            return new TicketRepository(new Tickets())
        }
        catch (error) {
            console.log(error)
        }
    }
}