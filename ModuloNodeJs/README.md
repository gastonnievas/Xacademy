Santex Xacademy 2023 - Módulo NodeJs. 
Repositorio para entregas de trabajos de Gastón Nievas.

# 🔹 API REST para el manejo de librerías y libros
Esta es una API REST desarrollada utilizando Node.js, Express, Sequelize y Passport, que permite el manejo de librerías y los libros asociados a cada una de ellas. La API proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en las entidades de library, book y user.

## Requisitos
Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js
- NPM (Node Package Manager) o Yarn

## Pasos del desarrollo
A continuación se describe el proceso de desarrollo paso a paso para crear la API REST:

- Creación del proyecto: Se crea un nuevo directorio para el proyecto y se inicializa un nuevo proyecto de Node.js utilizando el comando npm init o yarn init. Se completan los detalles requeridos, como el nombre del proyecto, la descripción, la versión, etc.

- Instalación de dependencias: Se instalan las dependencias necesarias para el proyecto utilizando NPM o Yarn. Las dependencias principales son:

    - Axios: Para realizar llamadas http.
    - Express: Para crear y manejar el servidor web.
    - Sequelize: Para la interacción con la base de datos relacional.
    - Passport: Para la autenticación y autorización de usuarios.
    - JSONWebToken: Para generar tokens de autenticación.

- Configuración de la base de datos: Se configura la conexión a la base de datos, incluyendo el nombre de la base de datos, el nombre de usuario, la contraseña, el host y el dialecto (por ejemplo, MySQL).

- Creación de los modelos: Se crean los modelos de datos utilizando Sequelize. Se definen los atributos y las relaciones entre las entidades de library, book y user.

- Creación de las rutas: Se crean las rutas para cada entidad (library, book y user) utilizando Express. Se definen las rutas para las operaciones CRUD, así como para la autenticación de usuarios.

- Implementación de los controladores: Se implementan los controladores para manejar las solicitudes HTTP en cada ruta. Los controladores se encargan de interactuar con los modelos de datos y devolver las respuestas adecuadas.

- Implementación de providers: Se define la lógica de configuración y creación de objetos.

- Implementación de servicios: Se define la lógica de negocio para utilizar en la API REST. 

- Implementación de la autenticación: Se implementa la autenticación de usuarios utilizando Passport. Se configuran las estrategias de autenticación (por ejemplo, autenticación basada en tokens) y se protegen las rutas que requieren autenticación.

- Implementación de middleware de autenticación para bloquear o permitir ejecuciones del endpoint.

- Validación de entidades: Se implementa la validación de las entidades (library, book y user) utilizando las capacidades de validación de Sequelize. Se definen las reglas de validación para los campos requeridos, únicos y otros requisitos específicos.

- Configuración del servidor: Se configura el servidor Express para escuchar las solicitudes en un puerto específico. Se establece la conexión a la base de datos y se sincronizan los modelos con la base de datos.

- Pruebas y ejecución: Se realizan pruebas para verificar el funcionamiento de la API. Se ejecuta el servidor y se prueban las diferentes rutas utilizando herramientas como Postman o Insomnia.

- Validación de entidades: Se han agregado reglas de validación utilizando las capacidades de validación de Sequelize. Las entidades (librería, libro, usuario) son validadas al momento de crearse o actualizarse.

- Autenticación y autorización: Se ha implementado la autenticación y autorización de usuarios utilizando Passport. Se protegen las rutas que requieren autenticación y solo los usuarios autenticados pueden acceder a ellas.

## Uso de la API
Una vez que el servidor está en funcionamiento, se pueden realizar solicitudes a la API utilizando herramientas como Postman o curl. A continuación se proporciona una descripción de los endpoints disponibles:

**POST /login** Inicia sesión y obtiene un token de autenticación.
JSON: {"user": "admin", "password": "admin"}

**POST /user/** Crea un nuevo usuario. Requiere JSON y token Bearer.

**GET /user/id** Obtiene un usuario en particular.

**GET /user** Obtiene todos los usuarios.

**PUT /user/id** Modifica un usuario en particular. Requiere JSON y token Bearer.

**DELETE /user/id** Elimina un usuario en particular (borrado lógico). Requiere token Bearer.


**POST /library** Crea una nueva librería. Requiere JSON y token Bearer.

**GET /library/id** Obtiene una librería en particular con todos los libros asociados y no eliminados.

**GET /library** Obtiene todas las librerías.

**PUT /library/id** Modifica una librería en particular. Requiere JSON y token Bearer.

**DELETE /library/id** Elimina una librería en particular (borrado lógico). Requiere token Bearer.


**POST /book** Crea un nuevo libro. Requiere JSON y token Bearer.

**GET /book/id** Obtiene un libro en particular.

**GET /book** Obtiene todos los libros.

**PUT /book/id** Modifica un libro en particular. Requiere JSON y token Bearer.

**DELETE /book/id** Elimina un libro en particular (borrado lógico). Requiere token Bearer.
