import { Users } from '../dao/factory.js'
import UserRepository from '../repository/user.repository.js'

export default class UserService {
    static getUserService(){
        try {
            return new UserRepository(new Users())
        }
        catch (error) {
            console.log(error)
        }
    }
}