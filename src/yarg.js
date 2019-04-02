
const nombre = {
    demand: true,
    alias: 'n'
}

const cedula = {
    demand: true,
    alias: 'c'
}

const telefono = {
    demand: true,
    alias: 't'
}

const email = {
    demand: true,
    alias: 'x'
}

const perfil = {    
    alias: 'p',
    default:'aspirante'
}
//Crear
const creacion = {
    nombre,
    cedula,
    telefono,
    email
}


//Actualizar
const actualizar = {
    nombre,
    asignatura : {
        demand: true,
        alias: 'a'
    },
   calificacion : {
       demand: true,
       alias: 'c'
   }
}

//Eliminar
const eliminar = {
    nombre
}

const nombreCurso = {
    demand: true,
    alias: 'nc'
}

const idCurso = {
    demand: true,
    alias: 'ic'
}

const valorCurso = {
    demand: true,
    alias: 'vc'
}

const descripcionCurso = {
    demand: true,
    alias: 'dc'
}

const modalidadCurso = {    
    alias: 'mc',
    
}

const intensidadCurso = {    
    alias: 'ic',
   
}

const creacionCurso = {
    idCurso,
    nombreCurso,
    descripcionCurso,
    valorCurso,
    modalidadCurso,
    intensidadCurso
}


const argv = require('yargs')
    .command('crear', 'Crear un usuario', creacion)
    .command('mostrar', 'Muestra los estudiantes y sus notas')
    .command('actualizar','Actualiza la información del curso', actualizar)
    .command('eliminar', 'Elimina un estudiante', eliminar)
    .command('crearCursoCoordinador', 'Crear un curso', creacionCurso)

    .argv

module.exports = {
    argv
}