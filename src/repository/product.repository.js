export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }
    async getProducts(limit){
        return await this.dao.getProducts(limit)
    }
    async getProductById(pid){
        return await this.dao.getProductById(pid)
    }
    async createProduct(product){
        return await this.dao.createProduct(product)
    }
    async updateProduct(pid, product){
        return await this.dao.updateProduct(pid, product)
    }
    async manageStockProduct(pid, quantity, add, reduce){
        return await this.dao.manageStockProduct(pid, quantity, add, reduce)
    }
    async deleteProduct(pid){
        return await this.dao.deleteProduct(pid)
    }
}