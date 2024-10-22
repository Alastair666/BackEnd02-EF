import { validationResult } from 'express-validator'
import UserService from '../services/user.service.js'
import passport from 'passport'
import { generateToken } from '../middleware/auth.js'

export const createUser = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(401).json({ errores: errores.array() });
        }
        const newUser = req.body
        const result = await UserService.getUserService().createUser(newUser)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the user" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const getUserById = async(req,res)=>{
    try {
        // Obteniendo ID del producto y parametros para actualizar
        let { uid } = req.params
        const result = await UserService.getUserService().getUserById(uid)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the user" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const getRegister = async(req, res, next) =>{
    passport.authenticate('register', { session: false, failureRedirect: '/failregister' }, async(err, user, info)=>{
        try {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            //console.log(user)
            res.send({ status: "success", user })
        }
        catch (ex){
            res.status(500).json({ result: "error", errors: ex })
        }
    })(req, res, next)
}
export const getCurrent = async(req, res)=>{
    try {
        if (req.user){
            console.clear()
            console.log(req.user)
            const result = await UserService.getUserService().getUserById(req.user.id)
            if (result)
                res.status(200).json({ status: "success", user: result })//*/
            else
                res.send({ error: 'Error: '+req.error })
        }
        else
            res.send({ error: 'No autorizado: '+req.error })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}
export const getLoginUser = async(req, res, next) =>{
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }, async(err, user, info)=>{
        try {
            if (err) return next(err);
            if (!user) 
                return res.status(401).json({ message: info.message })
            const token = generateToken(user)
            res.cookie("jwt", token, { httpOnly: true, secure: false })
            console.log(`Token en user/login: ${token}`)
            res.send({ status: "success", user: {
                //id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                cart: user.cart
            } })
        }
        catch (ex){
            res.status(500).json({ result: "error", errors: ex })
        }
    })(req, res, next)
}
export const updateUser = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        // Obteniendo ID del producto y parametros para actualizar
        let { uid } = req.params
        let user = req.body
        let userToReplace = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            age: user.age,
            role: user.role
        }
        // Editando usuario en BD
        const result = await UserService.getUserService().updateUser(uid, userToReplace)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the user" })
    }
    catch (ex){
        res.status(500).json({ result: "error", errors: ex })
    }
}