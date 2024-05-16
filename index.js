const { Client } = require('pg');

const client = new Client({
  user: 'postgres', 
  host: 'localhost',
  database: 'estudiantesbd',
  password: '110580', 
  port: 5432,
});

client.connect();

// 1. Función para agregar un nuevo estudiante
async function agregarEstudiante(nombre, rut, curso, nivel) {
  const query = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)';
  const values = [nombre, rut, curso, nivel];
  try {
    await client.query(query, values);
    console.log('Estudiante agregado correctamente');
  } catch (err) {
    console.error('Error al agregar estudiante', err);
  }
}

// 2. Función para consultar un estudiante por rut
async function consultarEstudiantePorRut(rut) {
  const query = 'SELECT * FROM estudiantes WHERE rut = $1';
  try {
    const res = await client.query(query, [rut]);
    console.log('Estudiante:', res.rows[0]);
  } catch (err) {
    console.error('Error al consultar estudiante', err);
  }
}

// 3. Función para consultar todos los estudiantes
async function consultarTodosLosEstudiantes() {
  const query = 'SELECT * FROM estudiantes';
  try {
    const res = await client.query(query);
    console.log('Estudiantes:', res.rows);
  } catch (err) {
    console.error('Error al consultar estudiantes', err);
  }
}

// 4. Función para editar un estudiante
async function editarEstudiante(nombre, rut, curso, nivel) {
  const query = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4';
  const values = [nombre, curso, nivel, rut];
  try {
    await client.query(query, values);
    console.log('Estudiante editado correctamente');
  } catch (err) {
    console.error('Error al editar estudiante', err);
  }
}

// 5. Función para eliminar un estudiante
async function eliminarEstudiante(rut) {
  const query = 'DELETE FROM estudiantes WHERE rut = $1';
  try {
    await client.query(query, [rut]);
    console.log('Estudiante eliminado correctamente');
  } catch (err) {
    console.error('Error al eliminar estudiante', err);
  }
}

// Interacción por línea de comandos
const [,, action, ...args] = process.argv;

(async () => {
  switch (action) {
    case 'agregar':
      await agregarEstudiante(args[0], args[1], args[2], parseInt(args[3]));
      break;
    case 'consultar':
      await consultarEstudiantePorRut(args[0]);
      break;
    case 'consultar-todos':
      await consultarTodosLosEstudiantes();
      break;
    case 'editar':
      await editarEstudiante(args[0], args[1], args[2], parseInt(args[3]));
      break;
    case 'eliminar':
      await eliminarEstudiante(args[0]);
      break;
    default:
      console.log('Acción no reconocida. Usa: agregar, consultar, consultar-todos, editar, eliminar');
  }
  await client.end();
})();
