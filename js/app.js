let listaAlumno = [];

const objAlumno = {
    id: '',
    nombre: '',
    matricula: '',
    carrera: '',
    semestre: '',
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const matricula = document.querySelector('#matricula');
const carrera = document.querySelector('#carrera');
const semestre = (document.querySelector('#semestre'));
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombre.value === '' || matricula.value === '' || carrera.value == '' || semestre == '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if (editando) {
        editarAlumno();
        editando = false;
    } else {
        objAlumno.id = Date.now();
        objAlumno.nombre = nombre.value;
        objAlumno.matricula = matricula.value;
        objAlumno.carrera = carrera.value;
        objAlumno.semestre = semestre.value;

        agregarAlumno();
    }
}

function agregarAlumno() {

    listaAlumno.push({ ...objAlumno});

    mostrarAlumnos();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objAlumno.id = '';
    objAlumno.nombre = '';
    objAlumno.matricula = '';
    objAlumno.carrera = '';
    objAlumno.semestre = '';
}

function mostrarAlumnos() {
    limpiarHTML();

    const divAlumnos = document.querySelector('.div-alumnos');

    listaAlumno.forEach(alumno => {
        const { id, nombre, matricula, carrera, semestre } = alumno;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${matricula} - ${carrera} - ${semestre} `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarAlumno(alumno);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarAlumno(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divAlumnos.appendChild(parrafo);
        divAlumnos.appendChild(hr);
    });
}

function cargarAlumno(alumno) {
    const { id, nombre, matricula, carrera, semestre } = alumno;

    nombre.value = nombre;
    matricula.value = matricula;
    carrera.value = carrera;
    semestre.value = semestre;

    objAlumno.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarAlumno() {

    objAlumno.nombre = nombre.value;
    objAlumno.matricula = matricula.value;
    objAlumno.carrera = carrera.value;
    objAlumno.semestre = semestre.value;

    listaAlumno.map(alumno => {

        if (alumno.id === objAlumno.id) {
            alumno.id = objAlumno.id;
            alumno.nombre = objAlumno.nombre;
            alumno.matricula = objAlumno.matricula;
            alumno.carrera = objAlumno.carrera;
            alumno.semestre = objAlumno.semestre;
        }
    });

    limpiarHTML();
    mostrarAlumnos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarAlumno(id) {

    listaAlumno = listaAlumno.filter(alumno => alumno.id !== id);
    alert(`Alumno ${alumno.nombre} eliminado`)

    limpiarHTML();
    mostrarAlumnos();
}

function limpiarHTML() {
    const divAlumnos = document.querySelector('.div-alumnos');
    while (divAlumnos.firstChild) {
        divAlumnos.removeChild(divAlumnos.firstChild);
    }
}