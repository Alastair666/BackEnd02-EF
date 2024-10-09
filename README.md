# Entrega Final. Programación Backend II: Diseño y Arquitectura Backend

## Comisión 70070

**Objetivos generales** : 
1. Profesionalizar el servidor desarrollado en la primera preentrega.
2. Implementar un sistema de login del usuario que trabaje con jwt.

**Objetivos específicos** : 
1. Aplicar una arquitectura profesional para nuestro servidor.
2. Aplicar prácticas como patrones de diseño, mailing, variables de entorno. etc.

**Se debe entregar** : 
1. Modificar nuestra capa de persistencia para aplicar los conceptos de DAO y DTO.
2. Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.
3. Modificar la ruta  /current Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria.
4. Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:
    - Sólo el administrador puede crear, actualizar y eliminar productos.
    - Sólo el usuario puede agregar productos a su carrito.
5. Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos.
    - ***Id*** (autogenerado por mongo)
    - *code*: String debe autogenerarse y ser único
    - ***purchase_datetime***: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
    - ***amount***: Number, total de la compra.
    - ***purchaser***: String, contendrá el correo del usuario asociado al carrito.
6. Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.
    - La compra debe corroborar el stock del producto al momento de finalizarse.
        - Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
        - Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.
    - Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
    - En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
7. Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.

**Formato** : 
1. Link al repositorio de Github, sin la carpeta de node_modules.
    ```sh
    https://github.com/Alastair666/BackEnd02-EF.git

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Estructura](#estructura-del-proyecto)
4. [Endpoint](#endpoints)
5. [Conclusiones](#conclusiones)

## Introducción
Este proyecto es la primer pre-entrega final del curso "Programación Backend II: Diseño y Arquitectura Backend" de la plataforma Coderhouse.

## Instalación

### Requisitos
- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

### Instalación de Node.js
Para instalar Node.js, sigue estos pasos:

1. Descarga el instalador desde la página oficial de Node.js.
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Verifica la instalación ejecutando los siguientes comandos en tu terminal:
   ```bash
   node -v
   npm -v

### Instalación de Librerías
1. Una vez que Node.js esté instalado, puedes instalar las librerías necesarias para este proyecto. Ejecuta el siguiente comando en la raíz del proyecto:
    ```sh
    npm install bcrypt bcryptjs body-parser connect-mongo cookie-parser dotenv express express-handlebars express-session express-validator mongoose mongoose-paginate-v2 passport passport-jwt passport-local

## Estructura del Proyecto
1. **node_modules/**: Contiene las dependencias del proyecto.
2. **src/**: Carpeta principal del código fuente.
3. **config/**: Contiene los archivos de configuración para el acceso a la base de datos.
4. **data/**: Contiene los archivos de datos.
5. **middleware/**: Contiene los intermediarios de uso general de la aplicación.
6. **models/**: Contiene las definiciones de los modelos de las colecciones (Mongo DB).
4. **public/js/**: Contiene los scripts que se ejecutaran en las vistas (handlebars).
7. **routes/**: Contiene acceso a las funciones expuestas (endpoints).
8. **views/**: Contiene las interfaces con las que interactuará el usuario.

- La estructura del proyecto es la siguiente:
    ```
    BackEnd01_EF/
    ├── node_modules/
    ├── src/
    │   ├── config/
    │   ├── ├── database.config.js
    │   ├── ├── passport.config.js
    │   ├── data/
    │   ├── ├── products.json
    │   ├── middleware/
    │   ├── ├── auth.js
    │   ├── models/
    │   ├── ├── cart.model.js
    │   ├── ├── product.model.js
    │   ├── ├── user.model.js
    │   ├── public/
    │   ├── ├── js/
    │   ├── ├── ├── carts.js
    │   ├── ├── ├── index.js
    │   ├── ├── ├── products.js
    │   ├── ├── ├── tools.js
    │   ├── routes/
    │   ├── ├── carts.route.js
    │   ├── ├── products.route.js
    │   ├── ├── sessions.route.js
    │   ├── ├── users.route.js
    │   ├── ├── views.route.js
    │   ├── views/
    │   ├── ├── layouts/
    │   ├── ├── ├── main.hbs
    │   ├── ├── carts.handlebars
    │   ├── ├── index.handlebars
    │   ├── ├── products.handlebars
    │   ├── ├── users.handlebars
    ├── app.js
    ├── utils.js
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md

## Endpoints
A continuación se describen los endpoints disponibles en la aplicación:

### RENDER
Estos son los endpoint principales que proporcionan una interfaz al usuario
- **GET /** : Vista inicial de la aplicación
- **GET /products** : Vista general de la lista de productos disponibles
- **GET /carts/:cid** : Vista general del carrito en especifico con sus respectivos productos

### STATUS / JSON
- Estos son los endpoints de gestión encargados de las actualizaciones de las entidades y su respuesta se estandariza con el siguiente formato:
    ```sh
    { result : "success/error", payload : [], errors : null }
1. Estatus de petición correcta
    ```sh
    200 - OK
2. Estatus de petición incorrecta
    ```sh
    400 - Bad Request, 500 - Internal Server Error

A continuación se describen cada uno de los endpoints del proyecto:
#### CARTS
- **GET /api/carts/:uid** : Obtiene el carrito de un usuario en especifico
- **POST /api/carts/** : Inserta el carrito indicando el usuario en el cuerpo de la petición
- **PUT /api/carts/:cid** : Actualiza los productos del carrito especificando un arreglo en el body
- **PUT /api/carts/:cid/product/:pid** : Actualiza unicamente la cantidad de un producto dentro del carrito
- **DELETE /api/carts/:cid** : Elimina todos los productos del carrito solicitado
- **DELETE /api/carts/:cid/product/:pid** : Elimina un solo producto del carrito solicitado

#### PRODUCTS
- **GET /api/products/?limit** : Obtiene todos los productos registrados
- **GET /api/products/:pid** : Obtiene un solo producto especificando su ID
- **POST /api/products/** : Inserta un producto validando los campos dentro del body
- **PUT /api/products/:pid** : Actualiza los valores de un producto especificado validando los campos dentro del body
- **DELETE /api/products/:pid** : Elimina el producto especificando su ID

#### SESSIONS
- **POST /api/session/register** : Registra los datos del usuario validando que el email sea único.
- **GET /api/session/failregister** : Ruta alterna en caso de error en register.
- **POST /api/session/login** : Valida e inicializa acceso a la aplicación.
- **GET /api/session/faillogin** : Ruta alterna en caso de error en login.
- **GET /api/session/current** : Devuelve los datos del usuario, validando que este logeado.

#### USERS
- **GET /api/users/?email** : Obtiene el usuario especificando su email
- **POST /api/users/** : Inserta el usuario especificando los datos requeridos dentro del body

## Conclusiones
- Este proyecto demuestra el uso de Node.js y varias librerías para desarrollar una aplicación backend robusta. Si tienes alguna pregunta o necesitas más información, no dudes en contactarme.
    ```
    Este archivo `README.md` proporciona una guía clara y estructurada para la instalación, estructura y uso del proyecto