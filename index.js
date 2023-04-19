const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();




//crear el servidor de express
const app = express();

//base de datos
dbConnection();

//CORS
app.use(cors())

//directorio publico
app.use( express.static('public'));

//lectura y parseo del body
app.use( express.json() ); //extrae lo que trae la peticion json y extrae su contenido


//rutas
app.use('/api/auth', require('./routes/auth') );//todo lo que exporta './routes/auth' lo habilita en '/api/auth'
app.use('/api/events', require('./routes/events') );//todo lo que exporta './routes/events' lo habilita en '/api/events'


app.get('*', ( req, res ) => {
    res.sendFile( __dirname + '/public/index.html' )
})



// escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT } `)
})