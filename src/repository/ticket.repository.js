export default class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }
    async createTicket(ticket) {
        return await this.dao.createTicket(ticket)
    }
    async getTicketById(tid) {
        return await this.dao.getTicketById(tid)
    }
    async getTickets(limit) {
        return await this.dao.getTickets(limit)
    }
    async updateTicket(tid, Ticket) {
        return await this.dao.updateTicket(tid, Ticket)
    }
    async deleteTicket(tid) {
        return await this.dao.deleteTicket(tid)
    }
}