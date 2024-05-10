"use strict";
const express = require('express');
const app = express();
app.set('puerto', 8040);
const fs = require("fs");
app.use(express.json());
const path = "./archivos/productos.txt";
app.get('/', (request, response) => {
    response.send('GET - servidor NodeJS');
});
app.post('/', (request, response) => {
    response.send('POST - servidor NodeJS');
});
app.put('/', (request, response) => {
    response.send('PUT - servidor NodeJS');
});
app.delete('/', (request, response) => {
    response.send('DELETE - servidor NodeJS');
});
app.get('/productos', (request, response) => {
    fs.readFile(path, "UTF-8", (e, archivo) => {
        if (e) {
            throw ("Error en lectura");
        }
        let retornoArray = archivo.split(",\r\n");
        response.send(JSON.stringify(retornoArray));
    });
});
app.post('/productos', (request, response) => {
    let data = request.body;
    let objStr = JSON.stringify(data) + ",\r\n";
    fs.appendFile(path, objStr, (e) => {
        if (e) {
            throw ("Error de escritura");
        }
        response.send("Escritura realizada");
    });
});
app.put('/productos', (request, response) => {
    let data = request.body;
    let objStr = JSON.stringify(data) + ",\r\n";
    let cadena = "";
    fs.readFile(path, "UTF-8", (e, archivo) => {
        if (e) {
            throw ("Error en lectura");
        }
        let retornoArray = archivo.split(",\r\n");
        retornoArray.forEach((element) => {
            if (element !== "" && element !== undefined) {
                let obj = JSON.parse(element);
                if (obj.codigo === data.codigo) {
                    obj.marca = data.marca;
                    obj.precio = data.precio;
                }
                cadena += JSON.stringify(obj) + ",\r\n";
            }
        });
        console.log(cadena);
        fs.writeFile(path, cadena, (e) => {
            if (e) {
                throw ("Error de escritura");
            }
            response.send("Modificacion realizada");
        });
    });
});
app.delete('/productos', (request, response) => {
    let data = request.body;
    let objStr = JSON.stringify(data) + ",\r\n";
    let cadena = "";
    fs.readFile(path, "UTF-8", (e, archivo) => {
        if (e) {
            throw ("Error en lectura");
        }
        let retornoArray = archivo.split(",\r\n");
        retornoArray.forEach((element) => {
            if (element !== "" && element !== undefined) {
                let obj = JSON.parse(element);
                if (obj.codigo !== data.codigo) {
                    cadena += JSON.stringify(obj) + ",\r\n";
                }
            }
        });
        console.log(cadena);
        fs.writeFile(path, cadena, (e) => {
            if (e) {
                throw ("Error de escritura");
            }
            response.send("Eliminacion realizada");
        });
    });
});
app.listen(app.get('puerto'), () => {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});
//# sourceMappingURL=servidor.js.map