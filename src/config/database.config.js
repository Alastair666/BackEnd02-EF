import mongoose from 'mongoose';
import {insertBaseProducts} from '../utils.js'//Configuración Inicial
import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: './src/settings.env' });

const connectDB = async () =>{
    try {
        // Configura cadena de conexión
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB');
        insertBaseProducts()
    }
    catch (err) {
        console.error('Connection Error:', error);
        process.exit(1);
    }
}

export default connectDB;