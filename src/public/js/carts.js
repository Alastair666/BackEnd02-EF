// Creando evento de regreso a productos
document.getElementById("btnBack").addEventListener("click", async(event)=>{
    location.href = `/products`
})
// Creando evento para eliminación masiva de productos del carrito
document.getElementById("btnDeleteAll").addEventListener("click", async(event)=>{
    const cart = await getUserCart()
    if (cart){
        try {
            // Obtenemos el token de la cookie
            let jwtToken = await getCookie('jwt')
            console.log(`Bearer ${jwtToken}`)
            const options = {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            }
            const result = await fetch(`/api/carts/${cart._id}`, options)
            const jsonRes = await result.json()
            console.log(jsonRes)
            if (result.ok){
                if (jsonRes.result === "success"){
                    localStorage.removeItem("cartUser")
                    localStorage.setItem("cartUser", JSON.stringify(jsonRes.payload))
                    await
                    Swal.fire({
                        title : "Products Deleted!",
                        text : "Your cart is empty now",
                        icon: "success",
                        allowOutsideClick : false
                    }).then(r =>{
                        location.href = "/products"
                    })
                }
                else {
                    await Swal.fire({
                        title: "Opps!",
                        text: jsonRes.errors,
                        icon: "error"
                    });
                }
            }
            else
                throw new Error(`HTTP error! status: ${result.status}`)
        }
        catch (error) {
            console.error(error)
        }
    }
    else {
        await Swal.fire({
            title: "Opps!",
            text: "You don't have a cart",
            icon: "error"
        });
    }
})

const botonesEliminar = document.querySelectorAll("button.btn-delete-confirm")
if (botonesEliminar) {
    for (let btn of botonesEliminar){
        //Añadiendo evento de eliminación
        btn.addEventListener("click", async(event)=>{
            event.preventDefault()
            const cart = await getUserCart()
            if (!cart) {
                alert(`There's no User-Cart`)
            }
            else {
                
                try {
                    const idProd = btn.id
                    if (idProd != null){
                        let confirmDelete = false
                        await
                        Swal.fire({
                            title : "Delete Product!",
                            text : "¿Are you sure?",
                            icon: "warning",
                            allowOutsideClick : false,
                            showCancelButton: true
                        }).then(result =>{
                            if (result.isConfirmed)
                                confirmDelete = true
                        })

                        if (confirmDelete){
                            // Obtenemos el token de la cookie
                            let jwtToken = await getCookie('jwt')
                            console.log(`Bearer ${jwtToken}`)
                            //Definiendo opciones
                            const options = {
                                method: "DELETE",
                                headers: {
                                    'Authorization': `Bearer ${jwtToken}`,
                                    'Content-Type': 'application/json'
                                }
                            };
                            //Consumiendo EndPoint
                            const response = await fetch(`/api/carts/${cart._id}/product/${idProd}`, options)
                            const jsonRes = await response.json()
                            console.log(jsonRes)
                            if (response.ok){
                                if (jsonRes.result === "success"){
                                    localStorage.removeItem("cartUser")
                                    localStorage.setItem("cartUser", JSON.stringify(jsonRes.payload))
                                    await Swal.fire({
                                        title: "Product Deleted!",
                                        text: "You can added in the products page",
                                        icon: "success"
                                    }).then(result =>{
                                        location.href = window.location.href
                                    })
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
                                throw new Error(`HTTP error! status: ${response.status}`)
                        }
                    }
                }
                catch (error) {
                    console.error(`Delete One Product of the Cart error: ${error}`)
                }
            }
        })
    }
}