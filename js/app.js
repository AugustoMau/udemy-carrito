//VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Agregar un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo
        
        limpiarHTML(); //Eliminamos el HTML dentro del carrito
    });

}

//FUNCIONES
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }

}

//Extraer la info del curso al darle click
function leerDatosCurso(curso) {
    //crear un objeto con el contenido del curso actual, que se va a mostrar al agregar al carrito
    const infoCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent, 
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) { 
        //Acualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {//Si el id del curso que queremos agregar es igual al id de infoCurso
                curso.cantidad++;
                return curso;
            }
            else{
                return curso;
            }

            
        });
        articulosCarrito= [...cursos];
    }else{ 
        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        
    }

    console.log(articulosCarrito);

    carritoHTML();
}



//Muestra el carrito de compras en el HTML
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="120" >
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${curso.id}> X </a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos ya repetidos del tbody
function limpiarHTML() {
    //contenedorCarrito.innerHTML = '';

    //Forma secundaria
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}