export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }
    async getUserCart(uid){
        return await  this.dao.getUserCart(uid)
    }
    async getCartById(cid){
        return await this.dao.getCartById(cid)
    }
    async createUserCart(user){
        return await this.dao.createUserCart(user)
    }
    async putProductsInCart(cid, product){
        return await this.dao.putProductsInCart(cid, product)
    }
    async putQuantityProductsInCart(cid, pid, quantity){
        return await this.dao.putQuantityProductsInCart(cid, pid, quantity)
    }
    async deleteCartProducts(cid){
        return await this.dao.deleteCartProducts(cid)
    }
    async deleteCartProduct(cid, pid){
        return await this.dao.deleteCartProduct(cid, pid)
    }
    async purchaseCart(cid){
        return await this.dao.purchaseCart(cid)
    }
}