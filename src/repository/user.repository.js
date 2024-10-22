import UserDTO from '../dto/user.dto.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }
    async createUser(user) {
        const result = await this.dao.createUser(user)
        return new UserDTO(result)
    }
    async getUserById(uid) {
        const result = await this.dao.getUserById(uid)
        return new UserDTO(result)
    }
    async getUserByEmail(username) {
        return await this.dao.getUserByEmail(username)
    }
    /*async getCurrent(user) {
        const result = await this.dao.getUserByEmail(user.email)
        return new UserDTO(result)
    }//*/
    async getLoginUser(username, password) {
        return await this.dao.getLoginUser(username, password)
    }
    async updateUser(uid, user) {
        const result = await this.dao.updateUser(uid, user)
        return new UserDTO(result)
    }
}