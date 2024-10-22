import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local'
import UserService from '../services/user.service.js'
import jwt from "passport-jwt"
import { isValidPassword } from '../middleware/auth.js'

// Cargar variables de entorno
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

// Función que extrae a cookie del encabezado de la petición
const cookieExtractor = (req)=>{
    let token = null
    if (req && req.cookies){
        let cookie = req.cookies
        token = cookie.jwt
    }
    return token
}

const initializePassport = ()=>{
    // Passport JWT
    const options = {
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }
    passport.use('jwt', new JWTStrategy(options, async(jwt_payload, done)=>{
        console.log('Entro a passport JWT')
        console.log(jwt_payload)
        try {
            const user = await UserService.getUserService().getUserById(jwt_payload.user.id)
            //console.log(user)
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            return done(null, jwt_payload.user)
        } catch (error){
            console.error(error)
            return done(error)
        }
    }))//*/
    // Register User
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    },  async(req,username,password,done)=>{
            const { first_name, last_name, age, role } = req.body
            try {
                //Validando Campos Requeridos
                let resultado = false, msj_error = ''
                if (!first_name) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'first_name is required'
                if (!last_name) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'last_name is required'
                if (!age) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'age is required'
                if (!role) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'role is required'
                if (msj_error.trim() === '')
                    resultado = true
                console.warn(msj_error)
                //Validando resultado obtenido
                if (resultado) {
                    //Consultando email en uso
                    const user = await UserService.getUserService().getUserByEmail(username)
                    //console.log(user)
                    if (user)
                        return done(null, false, { message: `This email '${username}' is already in use` })
                    else
                        console.warn(`This email '${username}' is not in use`)

                    //Creando registro de usuario
                    const newUser = {
                        first_name: first_name, 
                        last_name: last_name, 
                        email: username,
                        age: age, 
                        password: password,
                        role: role
                    }
                    let result = await UserService.getUserService().createUser(newUser)
                    return done(null, result)
                } else {
                    return done(null, false, { message: msj_error })
                }
            }
            catch (err) {
                console.log(err)
                return done(null, false, { message: err })
            }
    }))
    // Log User
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (username, password, done)=>{
        try {
            //Consultando email en uso
            const user = await UserService.getUserService().getLoginUser(username, password)
            if (!user) return done(null, false, { message: `This email '${username}' doesn't exists!` })
            //Validando contraseña
            if (!isValidPassword(user, password)) return done(null, false, { message: `The password is incorrect.` })
            //Devolviendo resultado obtenido
            return done(null, user)
        } catch (err) {
            console.error(err)
            return done(err)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        let user = await userService.findById(id)
        done(null, user)
    })
}

export default initializePassport