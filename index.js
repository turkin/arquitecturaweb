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
    //Respondo clientes
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("clients").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.json(result);
        });
    });
});

app.get('/api/clients/:id', (req, res, next) => {
    //Respondo clientes
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        var query = { dni:Number(req.params.id)};
        console.log(query);
        dbo.collection("clients").findOne(query, function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            if (result) {
                res.json(result);
            } else {
                res.status(404).json('');
            }
        });
    });
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
    res.status(201).json(req.body);
});

app.patch('/api/clients/', (req, res, next) => {
    res.status(400).json('');
});

app.patch('/api/clients/:id', (req, res, next) => {
    //Actualizo cliente 
    var query = { dni: Number(req.params.id) };
    var changed = 0;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        if (typeof req.body.apellido !== 'undefined' && req.body.apellido) {
                var newvalues = { $set: { apellido: req.body.apellido } };
                dbo.collection("clients").updateOne(query, newvalues, function (err, res) {
                    if (err) throw err;
                    if (res.modifiedCount) {
                        console.log("Apellido actualizado");
                        changed = changed + 1;
                    }
                });
        }
        if (typeof req.body.nombre !== 'undefined' && req.body.nombre) {
                var newvalues = { $set: { nombre: req.body.nombre } };
                dbo.collection("clients").updateOne(query, newvalues, function (err, res) {
                    if (err) throw err;
                    if (res.modifiedCount) {
                        console.log("Nombre actualizado");
                        changed = changed + 1;
                    }
                });
        }
        if (typeof req.body.dni !== 'undefined' && req.body.dni) {
                var newvalues = { $set: { dni: req.body.dni } };
                dbo.collection("clients").updateOne(query, newvalues, function (err, res) {
                    if (err) throw err;
                    if (res.modifiedCount) {
                        console.log("DNI actualizado");
                        changed = changed + 1;
                    }
                });
        };
         //respondo con los datos actualizados
        if (typeof req.body.dni !== 'undefined' && req.body.dni) {
            var newQuery = { dni: Number(req.body.dni) };
        } else {
            var newQuery = { dni: Number(req.params.id) };
        }
        dbo.collection("clients").findOne(newQuery, function (err, result) {
            if (err) throw err;
            db.close();
            if (result && changed) {
                res.json(result);
            } else if (result && !changed) {
                res.status(400).json('');
            } else {
                res.status(404).json('');
            }
        });

    });
});

app.delete('/api/clients/', (req, res, next) => {
    res.status(404).json('');
});

app.delete('/api/clients/:id', (req, res, next) => {
    //Elimino cliente y respondo con los datos eliminados');
    var borrado;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        var query = { dni: Number(req.params.id) };
        dbo.collection("clients").findOne(query, function (err, result) {
            if (err) throw err;
            if (result) {
                var borrado = result;
                dbo.collection("clients").deleteOne(query, function (err, obj) {
                    if (err) throw err;
                    console.log("Cliente eliminado");
                    db.close();
                    console.log(borrado);
                    res.json(borrado);
                });
            } else {
                db.close();
                res.status(404).json('');
                
            }
        });
    });
});


//CRUD libros

app.get('/api/books', (req, res, next) => {
    //Respondo libros
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("books").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.json(result);
        });
    });
});

app.get('/api/books/:id', (req, res, next) => {
    //Respondo libros
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        var query = { id: Number(req.params.id) };
        console.log(query);
        dbo.collection("books").findOne(query, function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            if (result) {
                res.json(result);
            } else {
                res.status(404).json('');
            }
        });
    });
});

app.post('/api/books', (req, res, next) => {
    //Ingreso libro y respondo con los datos ingresados
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("books").insertOne(req.body, function (err, res) {
            if (err) throw err;
            console.log("Libro agregado");
            db.close();
        });
    });
    res.status(201).json(req.body);
});

app.patch('/api/books/', (req, res, next) => {
    res.status(400).send('');
});

app.patch('/api/books/:id', (req, res, next) => {
    //Actualizo libro 
    var query = { id: Number(req.params.id) };
    var changed = 0;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        if (typeof req.body.autor !== 'undefined' && req.body.autor) {
            var newvalues = { $set: { autor: req.body.autor } };
            dbo.collection("books").updateOne(query, newvalues, function (err, res) {
                if (err) throw err;
                if (res.modifiedCount) {
                    console.log("Autor actualizado");
                    changed = changed + 1;
                }
            });
        }
        if (typeof req.body.nombre !== 'undefined' && req.body.nombre) {
            var newvalues = { $set: { nombre: req.body.nombre } };
            dbo.collection("books").updateOne(query, newvalues, function (err, res) {
                if (err) throw err;
                if (res.modifiedCount) {
                    console.log("Nombre actualizado");
                    changed = changed + 1;
                }
            });
        }
        if (typeof req.body.id !== 'undefined' && req.body.id) {
            var newvalues = { $set: { id: req.body.id } };
            dbo.collection("books").updateOne(query, newvalues, function (err, res) {
                if (err) throw err;
                if (res.modifiedCount) {
                    console.log("ID actualizado");
                    changed = changed + 1;
                }
            });
        };
        //respondo con los datos actualizados
        if (typeof req.body.id !== 'undefined' && req.body.id) {
            var newQuery = { id: Number(req.body.id) };
        } else {
            var newQuery = { id: Number(req.params.id) };
        }
        dbo.collection("books").findOne(newQuery, function (err, result) {
            if (err) throw err;
            db.close();
            if (result && changed) {
                res.json(result);
            } else if (result && !changed) {
                res.status(400).json('');
            } else {
                res.status(404).json('');
            }
        });

    });
});

app.delete('/api/books/', (req, res, next) => {
    res.status(404).send('');
});

app.delete('/api/books/:id', (req, res, next) => {
    //Elimino libro y respondo con los datos eliminados');
    var borrado;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        var query = { id: Number(req.params.id) };
        dbo.collection("books").findOne(query, function (err, result) {
            if (err) throw err;
            if (result) {
                var borrado = result;
                dbo.collection("books").deleteOne(query, function (err, obj) {
                    if (err) throw err;
                    console.log("Libro eliminado");
                    db.close();
                    console.log(borrado);
                    res.json(borrado);
                });
            } else {
                db.close();
                res.status(404).json('');

            }
        });
    });
});


//CRUD renta

app.post('/api/rents', (req, res, next) => {
    //Ingreso cliente y libro y respondo con los datos ingresados
    const rent = [];
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        dbo.collection("rents").insertOne(req.body, function (err, result) {
            if (err) throw err;
            console.log("Renta agregada");
            var queryDNI = { dni: Number(req.body.cliente) };
            dbo.collection("clients").findOne(queryDNI, function (err, result) {
                if (err) throw err;
                //console.log(result);
                rent.push(result);
            });
            var queryID = { id: Number(req.body.libro) };
            dbo.collection("books").findOne(queryID, function (err, result) {
                if (err) throw err;
                //console.log(result);
                rent.push(result);
                db.close();
                res.status(201).json(rent);
            });
        });
    });
});

app.get('/api/rents/clients/', (req, res, next) => {
    res.status(400).json('');
});

app.get('/api/rents/clients/:id', (req, res, next) => {
    //Respondo alquileres por cliente
    var cont = 0;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        var query = { cliente: Number(req.params.id) };
        dbo.collection("rents").find(query, { projection: { cliente: 0 } }).toArray(function (err, result) {
            if (err) throw err;
            const rent = result;
            if (rent.length == 0) {
                res.status("404").json("");
            } else { 
                rent.forEach(element => {
                    var queryID = { id: Number(element.libro) };
                    dbo.collection("books").findOne(queryID, function (err, result) {
                        if (err) throw err;
                        element.libro = result;
                        cont = cont + 1;
                        if (cont == rent.length) {
                            db.close();
                            res.json(rent);
                        };
                    });
                });
            };
        });
    });
});

app.get('/api/rents/books/:id', (req, res, next) => {
    //Respondo alquileres por libro
    var cont = 0;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("library");
        var query = { libro: Number(req.params.id) };
        dbo.collection("rents").find(query, { projection: { libro: 0 } }).toArray(function (err, result) {
            if (err) throw err;
            const rent = result;
            if (rent.length == 0) {
                res.status("404").json("");
            } else {
                rent.forEach(element => {
                    var queryID = { dni: Number(element.cliente) };
                    dbo.collection("clients").findOne(queryID, function (err, result) {
                        if (err) throw err;
                        element.cliente = result;
                        cont = cont + 1;
                        if (cont == rent.length) {
                            db.close();
                            res.json(rent);
                        };
                    });
                });
            };
        });
    });
});


app.listen(3000, () => {
    console.log("Trabajo practico iniciado...");
});
