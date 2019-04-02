const express = require ('express');
const app = express();
const path = require ('path');
const hbs = require('hbs');
require('./helper');
const bodyParser = require('body-parser');
const dirNode_modules = path.join(__dirname , '../node_modules')

const directorioPublico = path.join(__dirname,'../public')
const directorioPartials = path.join(__dirname, '../partials')
app.use(express.static(directorioPublico));
hbs.registerPartials(directorioPartials);

//Bootstrap
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));


app.use(bodyParser.urlencoded({extended: false}));

//console.log(__dirname)

//handlebars
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {
        estudiante: 'Karen'
    });
});

const Cursosdetalle = () =>  {
    try {
        cursos = require('../cursos.json');
   }
    catch(error) {
        cursos = [];
    }
}


app.get('/aspirante', (req, res) => {
    

    res.render('aspirante', {
        estudiante: 'Karen'
    });
});

app.get('/coordinador', (req, res) => {
    res.render('coordinador', {
        estudiante: 'Karen'
    });
});



app.get('/estudiante', (req, res) => {
    

    res.render('estudiante', {
        estudiante: 'Karen'
    });
});
/*
//Cuando se usa get
app.get('/calculos',(req, res) => {
    console.log(req.query);
    res.render('calculos', {
       /* estudiante: 'Jaime',
        nota1: 4,
        nota2: 5,
        nota3: 3 */
        /*estudiante: req.query.nombre,
        nota1: parseInt(req.query.nota1),
        nota2: parseInt(req.query.nota2),
        nota3: parseInt(req.query.nota3)
    });
});
*/
//Cuando se usa post -> mas seguro
app.post('/calculos',(req, res) => {
    res.render('calculos', {
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        email: req.body.email
        
    });
});

app.post('/actualizarEstudiante',(req, res) => {
    res.render('actualizarEstudiante', {
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        email: req.body.email,
        rol:req.body.rol
        
    });
});

app.post('/crearCurso',(req, res) => {
    res.render('crearCurso', {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        modalidad: req.body.modalidad,
        intensidad: req.body.intensidad,
        estado: req.body.estado
        
    });
});

app.post('/mensajes',(req, res) => {
    res.render('mensajes', {
        curso: req.body.curso,
        cedula: req.body.cedula                
    });
});

app.post('/mensajesEliminar',(req, res) => {
    res.render('mensajesEliminar', {
        curso: req.body.curso,
        cedula: req.body.cedula                
    });
});

app.post('/cambiarEstado',(req, res) => {
    res.render('cambiarEstado', {
        curso: req.body.curso             
    });
});


app.post('/verCursosEstudiante',(req, res) => {
    res.render('verCursosEstudiante', {
        cedula: req.body.cedula             
    });
});


//funcion que redirige a una página genérica
app.get('*', (req, res) => {
    res.render('error', {
        estudiante:'error'
    });
});

app.listen(3000, () => {
    console.log('Escuchando por el puerto 3000');
});