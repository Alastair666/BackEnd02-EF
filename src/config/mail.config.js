import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: './src/settings.env' });

export function generateHTMLTicket(ticketData) {
    let html = ``
    const { code, purchase, amount, purchaser } = ticketData.t
    const { details } = ticketData.o
    try {
        //Armando el HTML
    html = 
    `<html>
        <body>
          <h1>Ticket de Compra</h1>
          <p><strong>Código de la Compra:</strong> ${code}</p>
          <p><strong>Fecha:</strong> ${purchase}</p>
          <p><strong>Monto Total:</strong> ${amount}</p>
          <p><strong>Cliente:</strong> ${purchaser}</p>
          <h2>Productos</h2>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>`
    details.forEach(product => {
      html += 
        `<tr>
          <td>${product.product}</td>
          <td>${product.quantity}</td>
          <td>${product.unit_price}</td>
          <td>${product.quantity * product.unit_price}</td>
        </tr>`
    })
    html += `</tbody>
          </table>
        </body>
      </html>`
    } catch (error) {
        console.error(error)
        html = `<div><h1>Error Ticket Html:${error}</h1></div>`
    }
    //Devolviendo Resultado Obtenido
    return html;
}

const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
    }
})
export default transport

