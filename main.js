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
  sessionStorage.setItem('correoDeUsuario', `${correo}`)
  sessionStorage.setItem('nombreDeUsuario', `${nombre} ${apellido}`)
}

//Buscador de DNI
function comprobadorDNI(x) {
  return usuarios.some(usuario => usuario.dni === x.value)
}

let PDF = []

const urlLibros = "./libros.json"

let libros = []

let paginasEscaparate

const contenidoWeb = document.querySelector("main")


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


  if (verificarEspacioCarrito()) { console.log("Hay espacio en el carrito") } else {
    alert("No podés reservar más de 3 libros a la vez. Por favor, eliminá alguno de tu carrito para continuar.")
    return
  }

  const libroReservar = libros.find(libro => libro.cod === codLibro)
  reserva.push(libroReservar)
  activadorBotonConfirmar()

  //  alert("Libro añadido a tus carrito. Seguí navegando por el escaparate o confirmá tu reserva.")

  modal(libroReservar)
  nuevaCard(libroReservar)

  libroReservar.ejemplares -= 1

  const nuevoLibroReservado = new ReservadosCard(
    libroReservar.cod,
    libroReservar.titulo,
    libroReservar.autor,
    1)


  if (libroReservar.ejemplares === 0) {
    document.getElementById(libroReservar.cod).outerHTML = `<button type="button" class="btn btn-secondary" id="${libroReservar.cod}">Sin stock</button> `
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

  const div = document.createElement('div')

  div.innerHTML = `<div class="card p-2 libroReservado-card" id="${libro.cod}-reservado">
    <div class="card-body">
    <h5 class="card-title">${libro.título}</h5>
    <p class="card-text">${libro.autoría}</p>
    <button class="btn btn-primary" id="${libro.cod}-eliminar">Eliminar</button>
    </div>
    </div>`

  carritoDeReservas.appendChild(div)

  const botonEliminarReserva = document.getElementById(`${libro.cod}-eliminar`)

  if (botonEliminarReserva) {
    botonEliminarReserva.addEventListener("click", () => {
      document.getElementById(`${libro.cod}-reservado`).remove()
      const index = reserva.indexOf("${this.cod}")
      reserva.splice(index, 1)
      activadorBotonConfirmar()

      // Aumentamos en uno la cantidad de ejemplares del libro
      const libroOriginal = libros.find((l) => l.cod === libro.cod)
      if (libroOriginal) { libroOriginal.ejemplares += 1 }

      const codigoAux = libroOriginal.cod
      const actualizarBotonStock = document.querySelector(`#` + codigoAux)
      actualizarBotonStock.textContent = "Reservar"
      actualizarBotonStock.className = "reservar btn btn-primary"
      actualizarBotonStock.addEventListener("click", () => reservar(codigoAux))


    })
  }
}



function modal(libro) {
  const msje = `¡Excelente! Acabás de añadir a tus reservas "<b>${libro.título}</b> " de <b>${libro.autoría}</b>.`

  const miModalDeConfirmacion = document.getElementById('miModal')
  let modalElement = document.getElementById('miModal')

  if (!miModalDeConfirmacion) {
    const div = document.createElement('div');
    div.innerHTML = `
          <div class="modal fade" id="miModal">
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
    modalElement = document.getElementById('miModal')
  } else {
    // Solo cambia el contenido del body si ya existe
    const body = modalElement.querySelector('.modal-body')
    if (body) body.innerHTML = msje
  }

  // Mostrar el modal
  const modal = new bootstrap.Modal(modalElement)
  modal.show()

}




function eventListenersReserva() {
  document.querySelectorAll(".reservar").forEach(boton => {
    boton.addEventListener("click", function () {

      reservar(this.id)


    })
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
    if (libro.ejemplares > 0) { verificacionEjemplar = `<button class="reservar btn btn-primary" id="${libro.cod}">Reservar</button>` } else { verificacionEjemplar = `<button type="button" class="btn btn-secondary id="${libro.cod}">Sin stock</button> ` }


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
        ${verificacionPDF ? `    <div class="col"><a href="./pdf/${libro.cod}.pdf" target="_blank" class="btn btn-primary">Previsualizar</a></div>` : ""}
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


  const renderizarSidebarBtn = () => {
    if (!document.getElementById('btnSidebarReserva')) {
      userNameEnNavbar.insertAdjacentHTML('afterend', `
        <button id="btnSidebarReserva" class="btn btn-dark" type="button" style="margin-right: 1em" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
      `)
    }
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
}




function activadorBotonConfirmar() {
  const botonConfirmar = document.getElementById("confirmar")

  if (reserva.length > 0) {
    botonConfirmar.disabled = false
    botonConfirmar.addEventListener("click", function () {
      const mensajeEmailDeConfirmacion = `Hola, <b>${sessionStorage.getItem('nombreDeUsuario')}</b>!<br><br>
  Acabás de reservar los siguientes libros:<br><br>
  <ul>
  ${reserva.map(libro => `<li><b>${libro.título}</b> de <b>${libro.autoría}</b></li>`).join('')}</ul><br><hr><br>
  ¡Recordá que tenés tres días para retirarlos en la biblioteca y dos semanas completas para leerlos y devolverlos!<br><br>No dudes en contactarnos si tenés alguna duda o consulta.<br><hr><br>`
      enviarCorreo(mensajeEmailDeConfirmacion)
      finalizarReserva()
    })
  } else {
    botonConfirmar.disabled = true
    botonConfirmar.removeEventListener("click", function () {
      const mensajeEmailDeConfirmacion = `Hola, <b>${sessionStorage.getItem('nombreDeUsuario').toUpperCase()}</b>!<br><br>
  Acabás de reservar los siguientes libros:<br><br>
  <ul>
  ${reserva.map(libro => `<li><b>${libro.título}</b> de <b>${libro.autoría}</b></li>`).join('')}</ul><br><hr><br>
  ¡Recordá que tenés tres días para retirarlos en la biblioteca y dos semanas completas para leerlos y devolverlos!<br><br>No dudes en contactarnos si tenés alguna duda o consulta.<br><hr><br>`
      enviarCorreo(mensajeEmailDeConfirmacion)
      finalizarReserva()

    })
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
