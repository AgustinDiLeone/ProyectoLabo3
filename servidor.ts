//nsjs => tab
//Transpilar js
//Transpilar js => con watch => para que admita cambios en ejecucion
//node servidor => para arrancar
//nodemon servidor => para arrancar y que admita cambios en ejecucion
//localhost:"puerto"
//contol + "c" => para frenar


const express = require('express');

const app = express();

app.set('puerto', 8040);

const fs = require("fs"); // escribir/leer archivos txt

app.use(express.json()); // poder usar .json

const path = "./archivos/productos.txt";

app.get('/', (request:any, response:any)=>{
    response.send('GET - servidor NodeJS');
});
app.post('/', (request:any, response:any)=>{
    response.send('POST - servidor NodeJS');
});
app.put('/', (request:any, response:any)=>{
    response.send('PUT - servidor NodeJS');
});
app.delete('/', (request:any, response:any)=>{
    response.send('DELETE - servidor NodeJS');
});

app.get('/productos', (request:any, response:any)=>{

    fs.readFile(path,"UTF-8",(e:any, archivo:any)=>{
        //e = error
        if(e)//chequeamos si hay algun error
        {
            throw("Error en lectura");
        }
        let retornoArray = archivo.split(",\r\n"); // \r\n => enter
        //console.log(retornoArray);
        response.send(JSON.stringify(retornoArray));
    });
});
app.post('/productos', (request:any, response:any)=>{

    let data = request.body;
    //console.log(data);

    let objStr = JSON.stringify(data)+",\r\n"; // lo tranforma en cadena y le agrega coma y enter

    fs.appendFile(path,objStr,(e:any)=>{
        if(e){
            throw("Error de escritura");
        }
        response.send("Escritura realizada");
    })
});
app.put('/productos', (request:any, response:any)=>{
    let data = request.body;
    //console.log(data);

    let objStr = JSON.stringify(data)+",\r\n"; // lo tranforma en cadena y le agrega coma y enter
    let cadena:string = "";

    fs.readFile(path,"UTF-8",(e:any, archivo:any)=>{
        //e = error
        if(e)//chequeamos si hay algun error
        {
            throw("Error en lectura");
        }
        let retornoArray = archivo.split(",\r\n"); // \r\n => enter
        retornoArray.forEach((element:any) => {
            if (element !== "" && element !== undefined)
            {
                let obj = JSON.parse(element);
                if(obj.codigo === data.codigo){
                    obj.marca = data.marca;
                    obj.precio = data.precio;
                }
                cadena += JSON.stringify(obj)+",\r\n";
            }
        });
    console.log(cadena);
    fs.writeFile(path,cadena,(e:any)=>{
        if(e){
            throw("Error de escritura");
        }
        response.send("Modificacion realizada");
    })
    }); 
});
app.delete('/productos', (request:any, response:any)=>{
    let data = request.body;
    //console.log(data);

    let objStr = JSON.stringify(data)+",\r\n"; // lo tranforma en cadena y le agrega coma y enter
    let cadena:string = "";

    fs.readFile(path,"UTF-8",(e:any, archivo:any)=>{
        //e = error
        if(e)//chequeamos si hay algun error
        {
            throw("Error en lectura");
        }
        let retornoArray = archivo.split(",\r\n"); // \r\n => enter
        retornoArray.forEach((element:any) => {
            if (element !== "" && element !== undefined)
            {
                let obj = JSON.parse(element);
                if(obj.codigo !== data.codigo){
                    cadena += JSON.stringify(obj)+",\r\n";
                }
            }
        });
    console.log(cadena);
    fs.writeFile(path,cadena,(e:any)=>{
        if(e){
            throw("Error de escritura");
        }
        response.send("Eliminacion realizada");
    })
    }); 
});
app.listen(app.get('puerto'), ()=>{
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});