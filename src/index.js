const { argv } = require('./yargs');
const funciones = require('./funciones');
/*
console.log(argv);
console.log('Posicion 0 ' + argv._[0]);
*/
let comando = argv._[0]

switch (comando) {
    case 'crear':
        funciones.crear(argv);
        helper.crear(argv);
    break

    case 'crearCursoCoordinador':
        funciones.crearCursoCoordinador(argv);
       
    break
    case 'mostrar':
        funciones.mostrar();
    break


    case 'actualizar':
        funciones.actualizar(argv.nombre, argv.asignatura, argv.calificacion)
    break

    case 'eliminar':
        funciones.eliminar(argv.nombre);
    break
    
    default:
    console.log('No ingreso un comando exitente');
    
}
