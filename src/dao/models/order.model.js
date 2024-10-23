import mongoose from 'mongoose';

// Definiendo Colección de Carritos
const ordersSchema = mongoose.Schema({
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tickets"
    },
    details: {
        type:[
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {type: Number, required: true },
                unit_price: {type: Number, required: true },
            }
        ],
        default: []
    }
})

// Exportando modelo de ordenes
const ordersModel = mongoose.model("orders", ordersSchema)
export default ordersModel