# Trabajo práctico de Arquitectura Web
Trabajo práctico realizado por Oscar Jové

Api para alquiler de libros


## Funciones

//CRUD usuarios

GET /api/clients - Lista los clientes - 200 OK

GET /api/clients/:id - Lista el cliente solicitado - 200 OK / 404 not found

POST /api/clients - Ingreso cliente (dni, nombre, apellido) y respondo con los datos ingresados - 201 created

PATCH /api/clients/:id - Actualizo cliente (dni, nombre, apellido) y respondo con los datos actualizados - 200 OK / 400 bad request / 404 not found

DELETE /api/clients/:id - Elimino cliente y respondo con los datos eliminados - 200 OK


//CRUD libros

GET /api/books - Lista los libros - 200 OK

GET /api/books/:id - Lista el libro solicitado - 200 OK / 404 not found

POST /api/books - Ingreso libro (id, nombre, autor) y respondo con los datos ingresados - 201 created

PATCH /api/books/:id - Actualizo libro (id, nombre, autor) y respondo con los datos actualizados - 200 OK / 400 bad request / 404 not found

DELETE /api/books/:id - Elimino libro y respondo con los datos eliminados - 200 OK


//CRUD renta

GET /api/rents/clients/:id - Lista alquileres por cliente - 200 OK / 400 bad request / 404 not found

GET /api/rents/books/:id - Lista alquileres por libro - 200 OK / 400 bad request / 404 not found


