import userModel from '../models/user.model.js'
import cartModel from '../models/cart.model.js'
import { createHash, isValidPassword } from '../../middleware/auth.js'

export default class User {
    createUser = async(user)=>{
        try {
            //Creando registro de usuario
            const newUserCart = await cartModel.create({ productsModel:[] })
            const newUser = await userModel.create({
                first_name : user.first_name, 
                last_name : user.last_name, 
                email: user.username,
                age: user.age, 
                password: createHash(user.password),
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
    getUserById =  async (uid) => {
        try {
            //Consultando email en uso
            const user = await userModel.findById(uid)
            if (user) 
                return user
        }
        catch  (error) {
            console.log(error)
            return null
        }
    }
    getUserByEmail = async(username)=>{
        try {
            //Consultando email en uso
            const user = await userModel.findOne({ email: username })
            if (user) 
                return user
        }
        catch   (error) {
            console.error(error)
            return null
        }
    }
    getLoginUser = async(username, password)=>{
        try {
            //Consultando email en uso
            const user = await userModel.findOne({ email: username })
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
            let updatedUser = {
                first_name : user.first_name, 
                last_name : user.last_name, 
                email: user.email,
                age: user.age, 
                password: createHash(user.password),
                role : user.role
            }
            let result = await userModel.updateOne({ _id: uid }, { $set: updatedUser })
            if (result)
                return await userModel.findById(uid)
            return null
        }
        catch (error) {
            console.error(error)
            return null
        }
    }
}