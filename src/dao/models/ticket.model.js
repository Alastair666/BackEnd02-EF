import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const ticketCollection = "Tickets"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4() // Generar un UUID
    },
    purchase: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const ticketService = mongoose.model(ticketCollection, ticketSchema);

export default ticketService