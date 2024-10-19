export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }
    async createUser(user) {
        return await this.dao.createUser(user)
    }
    async getUserById(uid) {
        return await this.dao.getUserById(uid)
    }
    async getUserByEmail(username) {
        return await this.dao.getUserByEmail(username)
    }
    async getLoginUser(username, password) {
        return await this.dao.getLoginUser(username, password)
    }
    async updateUser(uid, user) {
        return await this.dao.updateUser(uid, user)
    }
}