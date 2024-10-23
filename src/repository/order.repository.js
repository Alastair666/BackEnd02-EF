export default class OrderRepository {
    constructor(dao) {
        this.dao = dao
    }
    async createTicketOrder(tid, details){
        return await this.dao.createTicketOrder(tid, details)
    }
}