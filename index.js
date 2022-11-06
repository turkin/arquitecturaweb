const { request, response } = require("express");
const express = require("express");
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

//CRUD usuarios

app.get('/api/clients', (req, res, next) => {
    res.send('Respondo clientes');
});

app.post('/api/clients', (req, res, next) => {
    //Ingreso cliente y respondo con los datos ingresados
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("clients").insertOne(req.body, function (err, res) {
            if (err) throw err;
            console.log("Cliente agregado");
            db.close();
        });
    });
    res.status(201).send(req.body);
});

app.patch('/api/clients/', (req, res, next) => {
    res.status(400).send('No detalla usuario a actualizar');
});

app.patch('/api/clients/:id', (req, res, next) => {
    res.send('Actualizo cliente '+req.params.id+' y respondo con los datos actualizados');
});

app.delete('/api/clients/', (req, res, next) => {
    res.status(400).send('No detalla usuario a eliminar');
});

app.delete('/api/clients/:id', (req, res, next) => {
    res.send('Elimino cliente ' + req.params.id +' y respondo con los datos eliminados');
});


//CRUD libros

app.get('/api/books', (req, res, next) => {
    res.send('Respondo libros');
});

app.post('/api/books', (req, res, next) => {
    res.send('Ingreso libro y respondo con los datos ingresados');
});

app.patch('/api/books/', (req, res, next) => {
    res.status(400).send('No detalla libro a actualizar');
});

app.patch('/api/books/:id', (req, res, next) => {
    res.send('Actualizo libro ' + req.params.id + ' y respondo con los datos actualizados');
});

app.delete('/api/books/', (req, res, next) => {
    res.status(400).send('No detalla libro a eliminar');
});

app.delete('/api/books/:id', (req, res, next) => {
    res.send('Elimino libro ' + req.params.id + ' y respondo con los datos eliminados');
});



app.listen(3000, () => {
    console.log("Trabajo practico iniciado...");
});
