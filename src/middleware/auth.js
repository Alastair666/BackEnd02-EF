import bcrypt from 'bcrypt'
import passport from 'passport'
import jwt from 'jsonwebtoken'

/**
 * Funciones de encriptación para la contraseña
 * **/
export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

/**
 * Funciones para autenticar la petición
 * **/
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            console.log(`Error: ${err}\nUser: ${user}\nInfo: ${info}`)
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user
            next()
        })(req, res, next)
    }
}
/**
 * Funciones para autorizar la solicitud
 * **/
export const authorization = (role) => {
    return async (req, res, next) => {
        //console.log(`Entra en autorización: ${req.user.id}`)
        try {
            //Validando Token
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Access denied!, no token provide.' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Validando Rol asignado
            if (!decoded) 
                return res.status(401).send({ error: "Unauthorized" })
            else
                req.user = decoded.user;

            if (req.user.role !== role) 
                return res.status(403).send({ error: "No permission" })
    
            next()
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token.' });
        }
    }
}
/**
 * Funciones para gestionar el token JWT
 * **/
export const generateToken = (user) => {
    return jwt.sign({ 
        user: {id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role}
    }, process.env.JWT_SECRET, { expiresIn: '24h' });
}
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provide.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token.' });
    }
}