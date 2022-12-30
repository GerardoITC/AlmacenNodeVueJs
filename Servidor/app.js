let express = require('express')
let mysql = require('mysql')


//QUE EL CLIENTE (FRONTEND) PUEDA USAR LA API
let app = express()
//RECIBIR DATOS JSON
app.use(express.json())

let cors = require('cors')
let puerto = 3001
app.listen(puerto,function(){
    console.log("Servidor en linea")
})
const corsOptions ={
    origin:'http://localhost:8080', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//Base de datos
//Parametros de conexion
let conexion = mysql.createConnection({
host:'localhost',
user:'root',
passwordd:'',
database:'almacen'
})
conexion.connect(function(error){
    if(error){
        throw error
    }
    else{
        console.log('Conectado a la BD')
    }
})
//Rutas 
//Ruta de inicio - raiz
app.get('/',function(req,res){
    res.send('Ruta de inicio');
})

//Ruta a todos los clientes
app.get('/api/clientes',function(req,res){
    conexion.query("SELECT * FROM clientes",function(error,filas){
        if(error){
            throw error
        }
        else{
            res.send(filas)
        }
    })
})

//Ruta a todos los articulos
app.get('/api/articulos',function(req,res){
    conexion.query("SELECT * FROM articulos",function(error,filas){
        if(error){
            throw error
        }
        else{
            res.send(filas)
        }
    })
})

//Ruta a todos los proveedores
app.get('/api/proveedores',function(req,res){
    conexion.query("SELECT * FROM proveedores",function(error,filas){
        if(error){
            throw error
        }
        else{
            res.send(filas)
        }
    })
})

//Ruta a un cliente
app.get('/api/clientes/:clienteid',function(req,res){
    conexion.query("SELECT * FROM clientes where clienteid=?",[req.params.clienteid],function(error,fila){
        if(error){
            throw error
        }
        else{
            res.send(fila)
        }
    })
})

//Ruta a un articulo
app.get('/api/articulos/:articuloid',function(req,res){
    conexion.query("SELECT * FROM articulos where articuloid=?",[req.params.articuloid],function(error,fila){
        if(error){
            throw error
        }
        else{
            res.send(fila)
        }
    })
})

//Ruta a un proveedor
app.get('/api/proveedores/:proveedorid',function(req,res){
    conexion.query("SELECT * FROM proveedores where proveedorid=?",[req.params.proveedorid],function(error,fila){
        if(error){
            throw error
        }
        else{
            res.send(fila)
        }
    })
})

//Ruta para agregar un articulo
app.post('/api/articulos',function(req,res){
    let data= {descripcion: req.body.descripcion,
                cantidad:req.body.cantidad,
            costo:req.body.costo,
            proveedor:req.body.proveedor}
    let sql = "INSERT INTO articulos SET ?"
    conexion.query(sql,data,function(error,results){
        if (error){
            throw error
        }else{
            res.send(results)
        }
    })
})
//Ruta para agregar un cliente
app.post('/api/clientes',function(req,res){
    let data= {nombre: req.body.nombre,
                direccion:req.body.direccion,
            RFC:req.body.RFC}
    let sql = "INSERT INTO clientes SET ?"
    conexion.query(sql,data,function(error,results){
        if (error){
            throw error
        }else{
            res.send(results)
        }
    })
})
//Ruta para agregar un proveedor
app.post('/api/proveedores',function(req,res){
    let data= {nombre: req.body.nombre,
                RFC:req.body.RFC,
            direccion:req.body.direccion,
            telefono:req.body.telefono,
            observaciones:req.body.observaciones}
    let sql = "INSERT INTO proveedores SET ?"
    conexion.query(sql,data,function(error,results){
        if (error){
            throw error
        }else{
            res.send(results)
        }
    })
})
//RUTA PARA ACTUALIZAR UN ARTICULO
app.put('/api/articulos/:articuloid',function(req,res){
    let articuloid= req.params.articuloid
    let descripcion = req.body.descripcion
    let cantidad = req.body.cantidad
    let costo = req.body.costo
    let proveedor = req.body.proveedor
    let sql = "UPDATE articulos SET descripcion = ?,  cantidad = ?, costo = ?, proveedor = ? Where articuloid = ?"
    conexion.query(sql,[descripcion,precio,cantidad,articuloid],
        function(error,results){
            if(error){
                throw error
            }else{
                res.send(results)
            }
        })
})
//RUTA PARA ACTUALIZAR UN CLIENTE
app.put('/api/clientes/:clienteid',function(req,res){
    let clienteid= req.params.clienteid
    let nombre = req.body.nombre
    let direccion = req.body.direccion
    let RFC = req.body.RFC

    let sql = "UPDATE clientes SET nombre = ?,  direccion = ?, RFC = ? Where clienteid = ?"
    conexion.query(sql,[nombre,direccion,RFC,articuloid],
        function(error,results){
            if(error){
                throw error
            }else{
                res.send(results)
            }
        })
})
//RUTA PARA ACTUALIZAR UN PROVEEDOR
app.put('/api/proveedores/:proveedorid',function(req,res){
    let proveedorid= req.params.proveedorid
    let nombre = req.body.nombre
    let RFC = req.body.RFC
    let direccion = req.body.direccion
    let telefono = req.body.telefono
    let observaciones = req.body.observaciones

    let sql = "UPDATE proveedores SET nombre = ?, RFC = ?, direccion = ?, telefono = ?, observaciones = ?  Where proveedorid = ?"
    conexion.query(sql,[nombre,RFC,direccion,telefono,observaciones,proveedorid],
        function(error,results){
            if(error){
                throw error
            }else{
                res.send(results)
            }
        })
})
//RUTA PARA ELIMINAR UN ARTICULO
app.delete('/api/articulos/:articuloid',function(req,res){
    let articuloid = req.params.articuloid
    conexion.query('DELETE FROM articulos WHERE articuloid = ? ',[articuloid],function(error,results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})
//RUTA PARA ELIMINAR UN CLIENTE
app.delete('/api/clientes/:clienteid',function(req,res){
    let clienteid = req.params.clienteid
    conexion.query('DELETE FROM clientes WHERE clienteid = ? ',[clienteid],function(error,results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})
//RUTA PARA ELIMINAR UN PROVEEDOR
app.delete('/api/proveedores/:proveedorid',function(req,res){
    let proveedorid = req.params.proveedorid
    conexion.query('DELETE FROM proveedores WHERE proveedorid = ? ',[proveedorid],function(error,results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})
