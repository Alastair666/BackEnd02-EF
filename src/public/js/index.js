// Configura Variables del Cliente
function homePage(){
    localStorage.clear()
}
homePage()
//  Método que muestra la notificación
function notificaMsj(texto, tipo, segundos){
    let estilo = ""
    switch (tipo){
        case "Correcto":
            estilo = "success"
            break;
        case "Alerta":
            estilo = "warning"
            break;
        case "Error":
            estilo = "danger"
            break;
        default:
        case "Info":
            estilo = "primary"
            break;
    }
    //Mostrando notificación
    Toastify({
        text: texto,
        duration: (parseInt(segundos) || 0) * 1000,
        close: true,
        style: { background: estilo }
    }).showToast()
}

// Creando evento de Inicio de Sesión
document.getElementById("btnSignIn").addEventListener("click", async (event)=>{
    const { value: formValuesSignIn } = await
    Swal.fire({
        title : "Sign In",
        html: `<input id="txtEmail" type="text" class="swal2-input" placeholder="Email">
            <input id="txtPsswrd" type="password" class="swal2-input" placeholder="Email">`,
        preConfirm: () => {
            const txtEm = document.getElementById("txtEmail").value
            const txtPs = document.getElementById("txtPsswrd").value
            // Validando Datos
            if (!txtEm || !txtPs)
                Swal.showValidationMessage(`Please enter user data access`)
            // Devolviendo datos del formulario
            return [
                txtEm,
                txtPs
            ];
        },
        allowOutsideClick : false,
        showCancelButton: true,
    })
    
    if (formValuesSignIn){
        console.log(formValuesSignIn)
        await authUser(formValuesSignIn)
    }
})
// Creando evento de Inicio de Sesión
document.getElementById("btnSignUp").addEventListener("click", async (event)=>{
    const { value: formValuesSignUp } = await
    Swal.fire({
        title : "Sign Up",
        html: `
            <input id="txtFirstName" type="text" class="swal2-input" placeholder="First name">
            <input id="txtLastName" type="text" class="swal2-input" placeholder="Last name">
            <input id="txtEmail" type="text" class="swal2-input" placeholder="Email">
            <input id="txtPsswrd" type="password" class="swal2-input" placeholder="Password">
            <input id="txtAge" type="number" class="swal2-input" placeholder="Age">
            <input id="chkAdmin" type="checkbox">
        `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const txtFN = document.getElementById("txtFirstName").value
            const txtLN = document.getElementById("txtLastName").value
            const txtEm = document.getElementById("txtEmail").value
            const txtPs = document.getElementById("txtPsswrd").value
            const txtAg = document.getElementById("txtAge").value
            const chkAd = document.getElementById("chkAdmin").value

            if (!txtFN || !txtLN || !txtEm || !txtPs || !txtAg || !chkAd )
                Swal.showValidationMessage(`Please enter user data register`)
            
            return [
                txtFN,
                txtLN,
                txtEm,
                txtPs,
                txtAg,
                chkAd
            ];
        },
        allowOutsideClick : false
    })
    if (formValuesSignUp){
        console.log(formValuesSignUp)
        await registerUser(formValuesSignUp)
    }
})

async function authUser(loginArray) {
    try {
        const login = { email: loginArray[0], password: loginArray[1] }
        //console.log(login)
        const response = await fetch(`/api/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        //Validando Respuesta
        const jsonRes = await response.json()
        console.warn(jsonRes)
        if (response.ok){
            if (jsonRes.status === "success"){
                localStorage.removeItem("userEF")
                localStorage.setItem("userEF", JSON.stringify(jsonRes.user))
                location.href = "/products"
            }
            else {
                notificaMsj(`Sign In Errors: ${jsonRes.error}`, 'Error', 4)
            }
        }
        else {
            notificaMsj(`The user ${login.email} was not found`, 'Error', 4)
            console.error(`Auth Method error:`, jsonRes)
        }
    }
    catch (error) {
        notificaMsj(`The user ${login.email} wasn't registered, see the console for more details`, 'Error', 4)
        console.error(`There are problems with the registration method: `, error)
    }
}

async function registerUser(userArray) {
    try {
        user = { 
            first_name: userArray[0], 
            last_name: userArray[1], 
            email: userArray[2],
            password: userArray[3],
            age: userArray[4],
            role: 'user'
         }
        const response = await fetch(`/api/users/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const jsonRes = await response.json()
        console.log(jsonRes)
        //Validando Respuesta
        if (response.ok){
            if (jsonRes.status === "success"){
                console.log(jsonRes)
                notificaMsj(`The user ${userArray[2]} was registered`, 'Error', 4)
            }
            else {
                notificaMsj(`Register Errors: ${jsonRes.errors}`, 'Error', 4)
            }
        }
        else {
            console.error(`There are problems with the registration method: `, response.statusText)
            notificaMsj(`The user ${userArray[2]} wasn't registered: ${response.statusText}`, 'Error', 4)
        }
    }
    catch (error) {
        console.error(`There are problems with the registration method: `, error)
        notificaMsj(`The user ${userArray[2]} wasn't registered, see the console for more details`, 'Error', 4)
    }
}