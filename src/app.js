import express from 'express'
import dotenv from 'dotenv'
import { create } from 'express-handlebars'
import connectDB from './config/database.config.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
//Configuración Inicial
import viewsRouter from "./routes/views.route.js"
import productsRouter from './routes/products.route.js'
import cartsRouter from "./routes/carts.route.js"
import usersRouter from "./routes/users.route.js"
import __dirname, { ifEquals, inc } from './utils.js'

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: './src/settings.env' });
connectDB()
// Configurando Server
const app = express();
const PORT = process.env.PORT || 8080

// Configurar Handlebars para lectura de contenido de los endpoints
const hbs = create({
    runtimeOptions: {
        allowedProtoProperties: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        ifEquals,
        inc
    }
});
app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Configurando Middlewares para endpoints
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Utilizar recursos estaticos
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

// Enlazando rutas para endpoints
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/users", usersRouter)

// Ejecutando Servidor
app.listen(PORT, ()=>{
    console.clear()
    console.log(`Server running on port ${PORT}`)
})