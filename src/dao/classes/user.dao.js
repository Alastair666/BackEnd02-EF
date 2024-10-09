import userService from '../models/user.model.js'
import { createHash, isValidPassword } from '../../middleware/auth.js'

export default class User {
    createUser = async(user)=>{
        try {
            //Creando registro de usuario
            const newUserCart = await cartService.create({ productsModel:[] })
            const newUser = await userService.create({
                first_name : user.first_name, 
                last_name : user.last_name, 
                email: user.username,
                age: user.age, 
                password: createHash(password),
                role : user.role,
                cart: newUserCart._id
            })
            return newUser
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    getLoginUser = async(username, password)=>{
        try {
            //Consultando email en uso
            const user = await userService.findOne({ email: username })
            if (user) {
                //Validando contraseña
                if (isValidPassword(user, password)) {
                    return user
                }
            }
        }
        catch   (error) {
            console.error(error)
            return null
        }
    }
    updateUser = async(uid, user)=>{
        try {
            let retorno = await userService.updateOne({ _id: uid }, { $set: user })
            return retorno
        }
        catch (error) {
            console.error(error)
            return null
        }
    }
}