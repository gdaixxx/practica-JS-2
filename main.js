const usuarios = [
  {
    nombre: "COSME",
    apellido: "FULANITO",
    dni: 99_999_999,
    correo: "lv06du9i2@mozmail.com",
    clave: "JAVASCRIPT"
  }
]

let reserva = []


const PDF = ["ALBCUE002", "RYUCUE003", "EDUCUE004", "JULCUE005", "MARSOL006", "FEDLAI008", "JAVVAR009", "ROSLOS010", "BIBELM011", "SOFANT012", "MARTRA001"]

let libros = []

const urlLibros = "./libros.json"

let paginasEscaparate

function indicadorNumeroItemsEnCarrito() {
  const items = reserva.length
  const contador = document.querySelector(".contador-items")

  if (items > 0) {
    contador.textContent = items
    contador.style.display = "inline-block"
  } else {
    contador.style.display = "none"
  }
}

const contenidoWeb = document.querySelector("main")


document.getElementById("newUser").addEventListener("click", rendretizarNuevoUsuario)

const footer = document.querySelector('footer')
const userNameEnNavbar = document.getElementById("userName")

// FUNCIÓN ASÍNCRONA - SIMULA UNA PETICIÓN DE DATOS DE LOS LIBROS PARA SU RENDERIZADO EN PANTALLA, EN ESTE CASO HACIENDO FETCH A UN JSON
// Se ejecuta al iniciar sesión correctamente
async function getData() {
  try {
    const response = await fetch(urlLibros)
    const data = await response.json()

    libros = data
    renderizarEscaparate(libros)
    paginasEscaparate = Math.ceil(libros.length / 9)
    document.querySelector("#pagTotal").textContent = paginasEscaparate

    const inputDelBuscador = document.getElementById("buscador")

    // Buscador
    inputDelBuscador.addEventListener('input',
      function (event) {
        const texto = event.target.value.toLowerCase();

        const librosFiltrados = libros.filter(libro => libro.título.toLowerCase().includes(texto) || libro.autoría.toLowerCase().includes(texto))

        paginaActual = 0

        renderizarEscaparate(librosFiltrados)

        paginasEscaparate = Math.ceil(librosFiltrados.length / 9)

        document.querySelector("#pagTotal").textContent = paginasEscaparate
      })

  }

  catch (error) {
    console.log("Hay un error", error)
  }
}

const barraDeNavegacion = `<div class="botones-paginacion">
            
            <button  class="btn btn-primary flecha" onclick="paginaAnterior()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg></button>
            
            <div class="div"><span id="pagActual">d</span> de <span id="pagTotal">d</span></div>
            
            <button class="btn btn-primary flecha" onclick="paginaSiguiente()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg></button>
        </div>`

const renderizarSidebarBtn = () => {
  if (!document.getElementById('btnSidebarReserva')) {
    userNameEnNavbar.insertAdjacentHTML('afterend', `
        <button id="btnSidebarReserva" class="btn btn-dark posicionContador" type="button" style="margin-right: 1em" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
          </svg>
          <span class="contador-items" style="display: none;">1</span>
        </button>
      `)
  }
}

function loginSubmit() {
  const barraDeBusqueda = `<input class="form-control" id="buscador" type="text" placeholder="Buscar..." aria-label="default input example">`

  const userID = document.getElementById("userID").value
  const pwLogin = document.getElementById("pwLogin").value
  const usuario = usuarios.find(u => u.dni == Number(userID) && u.clave === pwLogin)
  if (usuario) {

    sessionStorage.setItem('nombreDeUsuario', `${usuario.nombre} ${usuario.apellido}`)
    sessionStorage.setItem('mailDeUsuario', `${usuario.correo}`)

    document.getElementById("userName").innerHTML = `Hola, ${usuario.nombre} ${usuario.apellido}`

    getData()

    document.querySelector('footer').insertAdjacentHTML('beforeend', barraDeNavegacion)

    document.querySelector('nav').insertAdjacentHTML('beforeend', barraDeBusqueda)

    document.querySelector('main').classList.toggle("main-logueado")

    renderizarSidebarBtn()

  } else {

    eliminarAlertas()

    const referencia = document.getElementById("formulario-login")

    const contenedorPadre = referencia.parentNode

    const alerta = document.createElement('div')

    alerta.innerHTML = 'Algo ha salido mal. Comprobá los datos ingresados.'
    alerta.classList.add("alert", "alert-danger", "datos-invalidos")

    contenedorPadre.insertBefore(alerta, referencia)

  }

}

document.getElementById("loginSubmit").addEventListener("click", loginSubmit)

class Usuario {
  constructor(nombre, apellido, dni, correo, clave) {
    this.nombre = nombre
    this.apellido = apellido
    this.dni = dni
    this.correo = correo
    this.clave = clave
  }
}

function crearUsuario(nombre, apellido, dni, correo, clave) {
  const nuevoUsuario = new Usuario(nombre, apellido, dni, correo, clave)
  usuarios.push(nuevoUsuario)
  sessionStorage.setItem('mailDeUsuario', `${correo}`)
  sessionStorage.setItem('nombreDeUsuario', `${nombre} ${apellido}`)
}

//Buscador de DNI
function comprobadorDNI(x) {
  return usuarios.some(usuario => usuario.dni === x.value)
}



function rendretizarNuevoUsuario() {

  const nuevoUsuarioPantalla = `<div class="mx-auto col-md-6 m-2 p-4 contenerdor" id="formulario-nuevo-usuario">
            <div class="form-floating mb-3">
                <input type="text" class="form-control input-mayusculas" id="nombre" placeholder="Nombre">
                <label for="floatingNombre">Nombre</label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control input-mayusculas" id="apellido" placeholder="apellido">
                <label for="apellido">Apellido</label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="dni" maxlength="8" pattern="[0-9]{7,8}" inputmode="numeric"
                    oninput="restringirDNI(this)" placeholder="DNI">
                <label for="dni">DNI</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control input-mayusculas" id="email" placeholder="nombre@ejemplo.com"
                    oninput="bloquearEspacios(this)">
                <label for="email">Correo electrónico</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" id="clave" class="form-control" placeholder="Clave"
                    oninput="bloquearEspacios(this)">
                <label for="floatingClave">Clave</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" id="claveRepetida" class="form-control" placeholder="Repetir clave"
                    oninput="bloquearEspacios(this)">
                <label for="floatingClave">Repetir clave</label>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-dark" type="button" id="enviar">Enviar</button>
        </div>`
  contenidoWeb.innerHTML = nuevoUsuarioPantalla

  document.getElementById("enviar").addEventListener("click", validarRegistro)
}

function reservar(codLibro) {

  const verificarEspacioCarrito = () => reserva.length <= 2


  if (!verificarEspacioCarrito()) {

    cargarSweetAlert().then(() => {
      Swal.fire({
        title: "Imposible agregar más libros",
        text: "No podés reservar más de 3 ejemplares a la vez. Por favor, eliminá alguno de tu carrito para continuar.",
        icon: "warning"
      })
    })

    return
  }

  const libroReservar = libros.find(libro => libro.cod === codLibro)

  reserva.push(libroReservar)
  activadorBotonConfirmar()
  modal(libroReservar)
  nuevaCard(libroReservar)
  indicadorNumeroItemsEnCarrito()

  libroReservar.ejemplares -= 1

  const nuevoLibroReservado = new ReservadosCard(
    libroReservar.cod,
    libroReservar.titulo,
    libroReservar.autor,
    1)


  if (libroReservar.ejemplares === 0) {
    document.getElementById(libroReservar.cod).outerHTML = `<button type="button" class="btn btn-secondary" id="${libroReservar.cod}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ban" viewBox="0 0 16 16">
  <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg></button> `
  }

}

//Usar clase para generar cards 
class ReservadosCard {
  constructor(cod, titulo, autor, cantidad) {
    this.cod = cod
    this.titulo = titulo
    this.autor = autor
    this.cantidad = cantidad
  }
}


function nuevaCard(libro) {
  const carritoDeReservas = document.querySelector(".offcanvas-body")
  const index = reserva.lastIndexOf(libro)
  const idUnico = `${libro.cod}-${index}`

  const div = document.createElement('div')
  div.innerHTML = `<div class="card p-2 libroReservado-card" id="${idUnico}-reservado" data-cod="${libro.cod}">
    <div class="card-body">
      <h5 class="card-title">${libro.título}</h5>
      <p class="card-text">${libro.autoría}</p>
      <button class="btn btn-primary" id="${idUnico}-eliminar">Eliminar</button>
    </div>
  </div>`

  carritoDeReservas.appendChild(div)

  const botonEliminarReserva = document.getElementById(`${idUnico}-eliminar`)

  // Define el handler fuera para poder removerlo si hiciera falta
  function handleEliminarReserva() {

    // Reconoce elimina la card del DOM usando el idUnico
    // Recupera del dataset del div el código identificador del libro
    // Elimina la card

    const cardDiv = document.getElementById(`${idUnico}-reservado`)
    console.log(cardDiv)
    const cod = cardDiv.dataset.cod
    console.log(cod)
    cardDiv.remove()

    // Busco el índice del libro en el array reservas a partir del código del libro
    const index = reserva.findIndex((libro) => libro.cod === cod)
    console.log(index)
    // verificar si el índice es válido antes de eliminar para evitar errores
    if (index !== -1) { reserva.splice(index, 1) }


    activadorBotonConfirmar()


    // Aumenta el stock del libro eliminado de la reserva
    const libroOriginal = libros.find((l) => l.cod === libro.cod)
    if (libroOriginal) { libroOriginal.ejemplares += 1 }

    // Actualiza el botón de stock     
    const actualizarBotonStock = document.querySelector(`#${libro.cod}`)

    if (actualizarBotonStock) {
      actualizarBotonStock.textContent = "Reservar"
      actualizarBotonStock.className = "reservar btn btn-primary"
      actualizarBotonStock.removeEventListener("click", reservarHandler)
      actualizarBotonStock.addEventListener("click", reservarHandler)
      indicadorNumeroItemsEnCarrito()
    }

    if (reserva.length === 0) {
      const offcanvas = document.getElementById('offcanvasRight')
      const instancia = bootstrap.Offcanvas.getInstance(offcanvas)
      instancia.hide()
    }
  }

  if (botonEliminarReserva) {
    botonEliminarReserva.addEventListener("click", handleEliminarReserva)
  }

}

function modal(libro) {
  const msje = `¡Excelente! Acabás de añadir a tus reservas "<b>${libro.título}</b> " de <b>${libro.autoría}</b>.`

  // Elimina todos los modals previos
  document.querySelectorAll('#miModal').forEach(m => m.remove());
  // Elimina backdrop si quedó alguno
  document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="modal fade" id="miModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">✅ Confirmación</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">${msje}</div>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(div)
  const modalElement = document.getElementById('miModal')

  // Crea y ejecuta el modal
  const modal = new bootstrap.Modal(modalElement)
  modal.show()

  // Elimina el modal del DOM al cerrarse
  modalElement.addEventListener('hidden.bs.modal', () => {
    div.remove();
  });
}

function reservarHandler() { reservar(this.id) }

function eventListenersReserva() {
  document.querySelectorAll(".reservar").forEach(boton => {
    boton.removeEventListener("click", reservarHandler)
    boton.addEventListener("click", reservarHandler)
  })
}

// PAGINACION
let paginaActual = 0
const cantidadPorPagina = 9

// Construir escaparate
function renderizarEscaparate(libros) {

  const inicio = paginaActual * cantidadPorPagina
  const fin = inicio + cantidadPorPagina
  const librosPagina = libros.slice(inicio, fin)

  contenidoWeb.innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4" id="cards-container"> </div>`

  const escaparate = document.getElementById('cards-container')

  librosPagina.forEach((libro) => {
    let verificacionPDF = PDF.includes(libro.cod)
    if (libro.ejemplares > 0) { verificacionEjemplar = `<button class="reservar btn btn-primary" id="${libro.cod}">Reservar</button>` } else { verificacionEjemplar = `<button type="button" class="btn btn-secondary id="${libro.cod}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ban" viewBox="0 0 16 16">
  <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg></button> ` }


    let texto = libro.autoría

    let acortamientoDeAutores = () => {

      if (texto.split(" ").length > 16) {
        texto = texto.split(" ").slice(0, 25).join(" ")
        return texto + "..."
      }
      return texto
    }


    let fichaDeLibro = `
        <div class="col">
        <div class="card h-100">
        <img src= "./img/${libro.cod}.jpeg" class="card-img-top" alt="..." onerror="this.onerror=null; this.src='./img/book-placeholder.jpg';">
        <div class="card-body">
        <h5 class="card-title">${libro.título}</h5>
        <p class="card-text">${acortamientoDeAutores()}</p>
        </div>
        <div class="card-footer">
        <div class="container text-center">
        <div class="row g-2">
            <div class="col">${verificacionEjemplar}</div>
        ${verificacionPDF ? `    <div class="col"><a href="./pdf/${libro.cod}.pdf" target="_blank" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
</svg></a></div>` : ""}
        <div class="col"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${libro.cod}+modal">Sinopsis</button></div>
        </div>
        </div>
        </div>

        <div class="modal fade" id="${libro.cod}+modal" tabindex="-1" aria-labelledby="${libro.cod}-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="${libro.cod}-label">🤓 Más acerca de "${libro.título}"</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
                ${libro.sinopsis}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
        </div>`

    escaparate.innerHTML += fichaDeLibro
    eventListenersReserva()
  })

  // Desactivar/activar botones
  document.querySelector("button[onclick='paginaAnterior()']").disabled = paginaActual === 0
  document.querySelector("button[onclick='paginaSiguiente()']").disabled = fin >= libros.length

  // Actualizar página actual
  document.querySelector("#pagActual").textContent = paginaActual + 1

  const renderizarCarritoSidebar = () => {
    footer.insertAdjacentHTML('beforebegin', `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Libros elegidos para reservar</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body g-2 id"></div>
        <div class="offcanvas-footer px-3 py-2 border-top">
          <button class="btn btn-secondary w-100" id="confirmar" data-bs-dismiss="offcanvas" disabled>Confirmar reserva</button>
      </div>
    </div>
  `)
    const botonConfirmar = document.getElementById("confirmar")
  }

  renderizarSidebarBtn()
  renderizarCarritoSidebar()
}


function paginaSiguiente() {
  if ((paginaActual + 1) * cantidadPorPagina < libros.length) {
    paginaActual++
    renderizarEscaparate(libros)
  }
}

function paginaAnterior() {
  if (paginaActual > 0) {
    paginaActual--
    renderizarEscaparate(libros)
  }
}

function validacionEmail(email) {
  const plantillaValidacion = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
  return plantillaValidacion.test(email)
}

//funcion de orden superior para evitar código repetido
function validarCampo(condicion, elemento) {
  if (condicion) {
    elemento.classList.add("is-valid")
    elemento.classList.remove("is-invalid")
    datosValidosComprobacion.push(true)

  } else {
    elemento.classList.add("is-invalid")
    elemento.classList.remove("is-valid")
    datosValidosComprobacion.push(false)
  }
}

function eliminarAlertas() {
  document.querySelectorAll(".alert").forEach(alerta => alerta.remove());
}

function validarRegistro() {

  const pw = document.getElementById("clave")
  const pw2 = document.getElementById("claveRepetida")
  const pwTrimmed = pw.value.trim()
  const mail = document.getElementById("email")
  const nombre = document.getElementById("nombre")
  const nombreTrimmed = nombre.value.trim()
  const apellido = document.getElementById("apellido")
  const apellidoTrimmed = apellido.value.trim()
  const dni = document.getElementById("dni")

  datosValidosComprobacion = []

  // Evaluea cada campo, modifica su estilo según sea o no válido, e incorpora al array datosValidosComprobacion un booleano
  validarCampo(validacionEmail(mail.value), mail)
  validarCampo(!nombreTrimmed == false, nombre)
  // chequea que la comprobación de que no esté vacío el campo (!nombre) y evalúa si es "falso" (o sea, por defecto, si el campo contiene texto) 
  validarCampo(!apellidoTrimmed == false, apellido)
  validarCampo(pw.value == pw2.value && !pwTrimmed == false && !pw.value.includes(" "), clave)
  validarCampo(pw2.value == pw.value && !pwTrimmed == false && !pw2.value.includes(" "), claveRepetida)
  validarCampo(dni.value > 10_000_000, dni)

  const esValido = datosValidosComprobacion.every(comprobacion => comprobacion === true)

  const referencia = document.getElementById("formulario-nuevo-usuario")

  const contenedorPadre = referencia.parentNode // Hice esto porque como el div no está suelto en el body sino dentro de manin JS no encontraba el nodo en el dom

  eliminarAlertas()

  //Validación general    
  switch (true) {
    case esValido && comprobadorDNI(dni) === false:
      crearUsuario(nombre.value, apellido.value, dni.value, mail.value, pw.value) // si los datos son válidos y el DNI no existe
      sessionStorage.setItem('nombreDeUsuario', `${nombre.value} ${apellido.value}`)
      document.getElementById("userName").innerHTML = `Hola, ${nombre.value} ${apellido.value}`
      getData()
      break

    case comprobadorDNI(dni) === true:
      const alertaDNI = document.createElement('div')
      alertaDNI.innerHTML = 'Ya existe un usuario registrado con tu número de DNI. Si olvidaste tu contraseña, contactate con el admin.'
      alertaDNI.classList.add("alert", "alert-danger", "DNI-existe")
      contenedorPadre.insertBefore(alertaDNI, referencia)
      break

    case esValido === false:
      const alerta = document.createElement('div')
      alerta.innerHTML = 'Algo ha salido mal. Comprobá los datos ingresados.'
      alerta.classList.add("alert", "alert-danger", "datos-invalidos")
      contenedorPadre.insertBefore(alerta, referencia)
      break
  }
}

function restringirDNI(input) {
  input.value = input.value.replace(/[^0-9]/g, "")
}

function bloquearEspacios(input) {
  input.value = input.value.replace(/\s/g, "")
}


document.querySelector(".input-mayusculas").addEventListener("input", function () {
  this.value = this.value.toUpperCase()
})



// CONFIRMACIÓN DE RESERVA

const finalizarReserva = () => {

  const contenedorPadre = document.querySelector(".offcanvas-body")

  contenedorPadre.innerHTML = ""

  reserva = []

  cargarSweetAlert().then(() => {
    Swal.fire({
      title: "¡Reserva confirmada!",
      text: "Recibirás un correo con los detalles de los libros que elegiste y las condiciones del préstamo.",
      icon: "success"
    })
  })

  const botonConfirmar = document.getElementById("confirmar")

  botonConfirmar.disabled = true
  indicadorNumeroItemsEnCarrito()
}



function handleConfirmarReserva() {
  const mensajeEmailDeConfirmacion = `Hola, <b>${sessionStorage.getItem('nombreDeUsuario').toUpperCase()}</b>!<br><br>Acabás de reservar los siguientes libros:<br><br><ul>${reserva.map(libro => `<li><b>${libro.título}</b> de <b>${libro.autoría}</b></li>`).join('')}</ul><br><hr><br>  ¡Recordá que tenés tres días para retirarlos en la biblioteca y dos semanas completas para leerlos y devolverlos!<br><br>No dudes en contactarnos si tenés alguna duda o consulta.<br><hr><br>`
  enviarCorreo(mensajeEmailDeConfirmacion)
  finalizarReserva()
}

function activadorBotonConfirmar() {
  const botonConfirmar = document.getElementById("confirmar")

  // Clona el botón de confirmar reserva en el DOM para evitar problemas de eventos duplicados y que no se envíen múlples correos de confirmación de la reserva

  const nuevoBoton = botonConfirmar.cloneNode(true);
  botonConfirmar.parentNode.replaceChild(nuevoBoton, botonConfirmar)

  if (reserva.length > 0) {
    nuevoBoton.disabled = false;
    nuevoBoton.addEventListener("click", handleConfirmarReserva)
  } else {
    nuevoBoton.disabled = true;
  }
}

function cargarEmailJS() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  });
}

function cargarSweetAlert() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11"
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

async function enviarCorreo(mensajeEmailDeConfirmacion) {
  try {
    await cargarEmailJS()
    emailjs.init("cipNwDIDtK1_ej7ev")

    await emailjs.send("adeltexto", "template_4dhwr7r", {
      correo: sessionStorage.getItem('mailDeUsuario'),
      mensaje: mensajeEmailDeConfirmacion,
    })

    console.log("Correo enviado ✅")
  } catch (error) {
    console.error("Error al enviar el correo ❌", error)
  }
}
