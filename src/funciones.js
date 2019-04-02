const fs = require('fs');
const hbs = require('hbs');
const helper = require('./helper');
listaEstudiantes = [];
listaCursos = [];
cursos = [];

hbs.registerHelper('crearCurso', (nombre, cedula,telefono, email) => {
    const student =
    {
        nombre:nombre,
        cedula:cedula,
        telefono:telefono,
        email:email
    };
       crear(student);

       return ('Se creó el usuario:' +nombre);
});


hbs.registerHelper('actualizarEstudiante', (nombre, cedula,telefono, email, rol) => {
    const student =
    {
        nombre:nombre,
        cedula:cedula,
        telefono:telefono,
        email:email,
        rol:rol
    };
    actualizarEstudiante(student);

  
});

hbs.registerHelper('cambiarEstadoCurso', (curso) => {

       cambiarEstadoCurso(curso);
});

hbs.registerHelper('crearCursoCoordinador', (id,nombre, descripcion,valor, modalidad, intensidad) => {
  
    const cur =
    {
        id:id,
        nombre:nombre,
        descripcion:descripcion,
        valor:valor,
        modalidad:modalidad,
        intensidad:intensidad,
        estado:'disponible'
    };
       crearCurso(cur);      
});

const crearCurso = (curso) => {
    Cursosdetalle();    

    let duplicado = cursos.find(c => c.id == curso.id);
    if(!duplicado){       
        cursos.push(curso);        
        guardarCursosCoordinador();
    }else{
        console.log('Ya existe ese curso creadoS');
    }
} 

hbs.registerHelper('verCursosEstudiante', (cedula) => {
    listarCursos(); 
    console.log(listaCursos);
    let nuevo = listaCursos.filter(buscar =>  buscar.cedula == cedula);
    
    console.log('holi log: '+ nuevo[0].cedula);
    let list = document.getElementById("listadoCursos");
    list.innerHTML="prueba";
    list.innerText="prueba";
 
});

hbs.registerHelper('eliminarCurso', (curso, cedula) => {
    
    eliminar(curso, cedula);

    return ('Se eliminó el curso '+curso+' asociado al usuario:' +cedula);
});

const eliminar = (curso, cedula) => {
    listarCursos(); 
    console.log(curso);
    console.log(cedula);
    console.log(listaCursos);
    let nuevo = listaCursos.filter(buscar => buscar.curso 
        != curso );
    nuevo= nuevo.filter(buscar =>buscar.cedula != cedula);

console.log(nuevo.length);

 if(nuevo.length == listaCursos.length){
        console.log('No existe un estudiante con ese nombre');
    }else{
        listaCursos = nuevo;
        guardarCursos();
        
    }
}

   hbs.registerHelper('crearCurso', (curso, cedula) => {                     
    listar();
    Cursosdetalle();
    let existe = listaEstudiantes.find(nom => (nom.cedula == cedula && nom.perfil=='aspirante'));
    let existeCurso = cursos.find(nom => (nom.materia == curso));
    if(existe&&existeCurso){  
            crearCursoCedula(curso,cedula);
    }else{
            console.log('no existe ese usuario con el perfil de aspirante o no esta disponible la materia');

        }
   });  
       
const crearCursoCedula = (curso,cedula) => {
    listarCursos();    
    let cur = {
        curso: curso,
        cedula: cedula        
    };
    let duplicado = listaCursos.find(nom => (nom.cedula == cur.cedula && nom.curso==cur.curso));
    if(!duplicado){       
        listaCursos.push(cur);        
        guardarCursos();
    }else{
        console.log('Ya existe un usuario con ese curso');
    }
} 



const crear = (estudiante) => {
    listar();
    console.log(listaEstudiantes);
    let est = {
        nombre: estudiante.nombre,
        cedula: estudiante.cedula,
        telefono: estudiante.telefono,
        email: estudiante.email,
        perfil: 'aspirante'
    };
    let duplicado = listaEstudiantes.find(nom => nom.cedula == estudiante.cedula);
    if(!duplicado){
       console 
        listaEstudiantes.push(est);
        
        guardar();
    }else{
        console.log('Ya existe un usuario con esa cédula');
    }
}

//Agregar varios objetos JSON
const listar = () =>  {
    try {
    //Opcion 1
    listaEstudiantes = require('../Listado.json');

    //Opción 2: Si el JSON varía de forma asincrónica
    //listaEstudiantes = JSON.parse(fs.readFileSync('Listado.json'));
    }
    catch(error) {
        listaEstudiantes = [];
    }
}

const Cursosdetalle = () =>  {
    try {
        cursos = require('../cursos.json');
   }
    catch(error) {
        cursos = [];
    }
}
const listarCursos = () =>  {
    try {
    //Opcion 1
    listaCursos = require('../listaCursos.json');

    //Opción 2: Si el JSON varía de forma asincrónica
    //listaEstudiantes = JSON.parse(fs.readFileSync('Listado.json'));
    }
    catch(error) {
        listaCursos = [];
    }
}

const guardar = () => {
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile('Listado.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado');
    })
}

const guardarCursosCoordinador = () => {
    let datos = JSON.stringify(cursos);
    fs.writeFile('cursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado');
    })
}

const guardarCursos = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listaCursos.json', datos, (err) => {
        if (err) throw (err);
        console.log('Archivo creado');
    })
}




const cambiarEstadoCurso = (curso) => {
    Cursosdetalle();
    console.log(cursos);
    console.log(curso);
    let encontrado = cursos.find(buscar => buscar.nombre == curso);
    if(!encontrado){
        console.log('No existe ese curso');
    }else{
        encontrado["estado"] = "no disponible";
        guardarCursosCoordinador();
    }
}


const actualizarEstudiante = (estudiante) => {
    listar();
    console.log(listaEstudiantes);
    console.log(estudiante);
    let encontrado = listaEstudiantes.find(buscar => buscar.cedula == estudiante.cedula);

   
    if(!encontrado){
        console.log('No existe esa cedula');
    }else{
        encontrado["nombre"] = estudiante.nombre;
        encontrado["telefono"] = estudiante.telefono;
        encontrado["cedula"] = estudiante.cedula;
        encontrado["rol"] = estudiante.rol;
        encontrado["email"] =estudiante.email;

        guardar();
    }
}
module.exports = {
    crear,
   
  
    cambiarEstadoCurso,
    eliminar,
    actualizarEstudiante
}