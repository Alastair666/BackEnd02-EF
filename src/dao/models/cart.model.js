import mongoose from 'mongoose';

// Definiendo Colección de Carritos
const cartSchema = mongoose.Schema({
    products: {
        type:[
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {type: Number, required: true }
            }
        ],
        default: []
    }
})

// Exportando modelo de carritos
const cartService = mongoose.model("carts", cartSchema)
export default cartService