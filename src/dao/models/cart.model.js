import mongoose from 'mongoose';

// Definiendo Colección de Carritos
const cartsSchema = mongoose.Schema({
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
const productsModel = mongoose.model("carts", cartsSchema)
export default productsModel