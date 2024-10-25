//  Método que muestra la notificación
async function notificaMsj(texto, tipo, segundos){
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
// Recuperando usuario almacenado
async function getUser() {
    return JSON.parse(localStorage.getItem("userEF")) ?? []
}
// Recuperando usuario almacenado
async function getUserCart() {
    return JSON.parse(localStorage.getItem("cartUser")) ?? []
}
async function validateSesion() {
    const user = await getUser()
    if (!user || user.length == 0)
        location.href = "/"
}
// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (cookieName === name) 
            return decodeURIComponent(cookieValue);
    }
    return null;
}
validateSesion()