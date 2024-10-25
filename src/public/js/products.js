// Recuperando Carrito de Usuario desde BD
async function getUserCartBD() {
    let msj = '', retorno = false, value = {}
    try {
        let user = await getUser()
        // Obtenemos el token de la cookie
        let jwtToken = await getCookie('jwt')
        // Configurando Petición
        const cart = await fetch(`/api/carts/user/${user.id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(cart)
        const jsonRes = await cart.json()
        if (cart.ok){
            value = jsonRes.payload
            retorno = true
        }
        else {
            msj = `Create Cart: ${jsonRes.errors}`
            throw new Error(`HTTP error! status: ${cart.status}`)
        }
    }
    catch (error){
        console.error(`Create User-Cart Errors: ${error}`)
        msj = `Create User-Cart Errors: ${error}`
        retorno = false
    }
    finally {
        if (retorno)
            return { result: "success", payload: value }
        else
            return { result: "error", errors: msj }
    }
}
// Creando Carrito de Usuario desde BD
async function createUserCartBD(){
    let msj = '', retorno = false, value = {}
    // Obtenemos el token de la cookie
    let jwtToken = await getCookie('jwt')
    console.log(`Bearer ${jwtToken}`)
    let user = await getUser()
    try {
        const createCart = await fetch(`/api/carts/user`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user.id })
        })
        //Validando Respuesta
        const jsonCreate = await createCart.json()
        if (createCart.ok){
            if (jsonCreate.result === "success"){
                retorno = true
                value = jsonCreate.payload
            }
            else {
                msj = `Create User-Cart Errors: ${jsonCreate.errors}`
                throw new Error(`HTTP error! status: ${createCart.status}`)
            }
        }
        else {
            msj = `Create User-Cart Errors: ${jsonCreate.errors}`
            throw new Error(`HTTP error! status: ${createCart.status}`)
        }
    }
    catch (error){
        console.error(`Create User-Cart Errors: ${error}`)
    }
    finally {
        if (retorno)
            return { result: "success", payload: value }
        else
            return { result: "error", errors: msj }
    }
}

// Gestionando Carrito por Usuario
async function manageCart() {
    try {
        const cart = await getUserCartBD()
        if (cart.result === "success"){
            localStorage.removeItem("cartUser")
            localStorage.setItem("cartUser", JSON.stringify(cart.payload))
        }
        else {
            const newCart = await createUserCartBD()
            if (newCart.result === "success") {
                console.log(`New Cart: `, newCart.payload)
                localStorage.removeItem("cartUser")
                localStorage.setItem("cartUser", JSON.stringify(newCart.payload))
            }
            else
                console.warn(newCart.errors)
        }
    }
    catch (error) {
        console.error(`Manage User-Cart Errors: ${error}`)
    }
}
manageCart()


const botonesAgregar = document.querySelectorAll("button.btn-add-confirm")
if (botonesAgregar) {
    for (let btn of botonesAgregar){
        //Añadiendo evento de eliminación
        btn.addEventListener("click", async(event)=>{
            event.preventDefault()
            const cart = await getUserCart()
            if (!cart) {
                notificaMsj(`There's no User-Cart`, 'Error', 4)
            }
            else {
                
                try {
                    const idProd = btn.id
                    if (idProd != null){
                        let quantity = 0
                        await
                        Swal.fire({
                            title : "Add Product",
                            input : "number",
                            text : "Quantity",
                            inputValidator : (value)=>{
                                return !value && "You need specify a quantity for your product"
                            },
                            allowOutsideClick : false
                        }).then(result =>{
                            quantity = result.value
                        })

                        if (quantity > 0){
                            // Obtenemos el token de la cookie
                            let jwtToken = await getCookie('jwt')
                            //Definiendo opciones
                            const options = {
                                method: "PUT",
                                headers: {
                                    'Authorization': `Bearer ${jwtToken}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ quantity: quantity })
                            };
                            //Consumiendo EndPoint
                            const response = await fetch(`/api/carts/${cart._id}/product/${idProd}`, options)
                            const jsonRes = await response.json()
                            console.log(jsonRes)
                            if (response.ok){
                                if (jsonRes.result === "success"){
                                    await manageCart()
                                    await Swal.fire({
                                        title: "Good job!",
                                        text: "You have added a product to your cart",
                                        icon: "success"
                                    });
                                }
                                else {
                                    await Swal.fire({
                                        title: "This isn't ok",
                                        text: jsonRes.errors,
                                        icon: "error"
                                    });
                                }
                            }
                            else
                                await Swal.fire({
                                    title: "This isn't ok",
                                    text: jsonRes.errors,
                                    icon: "error"
                                });
                        }
                        else
                            notificaMsj(`The Quantity ${quantity} is invalid`, 'Error', 4)
                    }
                }
                catch (error) {
                    console.error(`Add Product to Cart error: ${error}`)
                }
            }
        })
    }
}

// Creando evento de Inicio de Sesión
document.getElementById("btnLogOut").addEventListener("click", async (event)=>{
    try {
        const response = await fetch(`/api/users/logout`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        if (response.ok){
            localStorage.clear()
            location.href = '/'
        }
    }
    catch (err){
        notificaMsj(`Error al salir: ${err}`, "Error", 4)
        console.error(err)
    }
})

// Creando evento de Visualización del Cart
document.getElementById("btnSeeCart").addEventListener("click", async(event)=>{
    const cart = await getUserCart()
    if (cart){
        location.href = `/carts/${cart._id}`
    }
    else
        notificaMsj(`The User doesn't have a cart`, 'Error', 4)
})