CRUD de Países
Este proyecto implementa un CRUD (Crear, Leer, Actualizar y Eliminar) de países. A continuación, se describen las principales tecnologías y características utilizadas:

Características
Validación de datos:
Se empleó express-validator para garantizar la integridad de los datos en los endpoints de la API.

Front-end:
Las vistas fueron desarrolladas utilizando EJS, lo que permitió una integración dinámica de datos con el front-end.

Base de datos:
Para la persistencia de datos, se utilizó MongoDB, con el apoyo de la biblioteca mongoose para simplificar las operaciones con la base de datos.

Consumo de API externa:
Se integró una API externa para obtener información sobre países. Se utilizó un filtro para almacenar únicamente los países que tienen el idioma español en su lista de lenguajes.

Tecnologías principales
Node.js: Entorno de ejecución.
Express.js: Framework para la creación de la API.
Express-validator: Validación de datos en las solicitudes.
EJS: Motor de plantillas para las vistas.
MongoDB: Base de datos NoSQL para la persistencia.
Mongoose: ODM para interactuar con MongoDB.

Para la ejecucion del proyecto se debe escribir el comando de node app.mjs
