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
                email: user.email,
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
    /**  
     * Elimina los productos del carrito especificado
     * **/
    deleteUser = async(uid)=>{
        try {
            const user = await await userModel.findById(uid)
            if (user) {
                const result = await userModel.deleteOne({ _id: uid })
                return result
            }   
            else throw new Error("Can't find the user by ID:"+cid)
        }
        catch (error){
            console.log(error)
            throw new Error('Error delete Cart: ' + error.message)
        }
    }
}