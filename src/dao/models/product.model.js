import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definiendo Colección de Productos
const productsSchema = mongoose.Schema({
    //pid: {type: Number, required: true },
    title: {type: String, required: true, max: 50},
    description: {type: String, required: true, max: 150},
    code: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    status: {type: Boolean, required: true},
    stock: {type: Number},
    category : {type: String, required: true, max: 100}
})

// Añadiendo Plugin de paginación
productsSchema.plugin(mongoosePaginate)
// Exportando modelo de productos
const productsModel = mongoose.model("products", productsSchema)
export default productsModel