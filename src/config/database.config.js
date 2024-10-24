import mongoose from 'mongoose'
import config from './persistence.config.js'
import {insertBaseProducts} from '../utils.js'//Configuración Inicial
//import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
//dotenv.config({ path: './src/settings.env' });

const connectDB = async (attempts = 5) =>{
    let connected = false
    let retries = 0
    console.log(config)
    while (!connected && retries < attempts) {
        try {
            // Configura cadena de conexión
            await mongoose.connect(config.database)
            console.log('Connected to MongoDB');
            insertBaseProducts()
            connected = true; // Marcamos como conectado si tenemos éxito
        }
        catch (err) {
            console.error('Connection Error:', err)
            retries += 1
            if (retries < attempts) {
                console.log(`Retrying connection (${retries}/${attempts})...`);
                await new Promise(res => setTimeout(res, 2000)); // Espera 2 segundos antes de reintentar
            } else {
                console.error('Max retries reached. Exiting.');
                process.exit(1);
            }
        }
    }
}

export default connectDB;