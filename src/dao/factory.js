import config from '../config/persistence.config.js'

export let Carts
export let Products
export let Users
export let Tickets

async function initializeRepositories() {
    switch (config.persistence){
        case 'MONGO':{
            const { default: CartDB } = await import('./dbclasses/cart.db.js')
            const { default: ProductDB } = await import('./dbclasses/product.db.js')
            const { default: TicketDB } = await import('./dbclasses/ticket.db.js')
            const { default: UserDB } = await import('./dbclasses/user.db.js')
            Carts = CartDB
            Products = ProductDB
            Tickets = TicketDB
            Users = UserDB
            break
        }
        default: {
            console.error('Persistence type not supported')
            throw new Error('Persistence type not supported')
            break
        }
    }
}

await initializeRepositories()