import { Router } from 'express'
import { body } from "express-validator"
import { getUserById, getRegister, getLoginUser, updateUser, getCurrent }
        from '../controllers/user.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

/** POST 
 * Registro de Usuario
 * **/
router.post('/register', 
    [
        body('first_name').notEmpty().withMessage('FisrtName is required'),
        body('last_name').notEmpty().withMessage('LastName is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('role').notEmpty().withMessage('Role is required')
    ],getRegister)
/** GET 
 * Fallo en el registro
 * **/
router.get('/failregister', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})
/** POST 
 * Inicio de Sesión de Usuario
 * **/
router.post('/login', getLoginUser)
/** GET 
 * Fallo en el Login
 * **/
router.get('/faillogin', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})
/** GET 
 * Desc
 * **/
// Ruta de validación de autenticación
router.get('/current', passportCall('jwt'), authorization('user'), getCurrent)
/** GET 
 * Desc
 * **/
router.get('/logout', (req, res) => {
    // Limpiar la cookie
    res.clearCookie('jwt')
    // Redirigir al inicio
    res.redirect('/')
})
/** GET 
 * Deberá de traer solo el usuario
 * **/
router.get('/:uid', getUserById)
/** PUT 
 * Deberá agregar un actualizar el usuario
 * **/
router.put('/:uid',
    [
        body('first_name').notEmpty().withMessage('FisrtName is required'),
        body('last_name').notEmpty().withMessage('LastName is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('role').notEmpty().withMessage('Role is required')
    ],
    updateUser
)

// Exportando puntos de acceso
export default router