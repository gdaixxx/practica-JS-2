const usuarios = [
  {
    nombre: "COSME",
    apellido: "FULANITO",
    dni: 99_999_999,
    correo: "COSME@GMAIL.COM",
    clave: "JAVASCRIPT"
  }
]
let reserva = []

document.getElementById("newUser").addEventListener("click", rendretizarNuevoUsuario)

const footer = document.querySelector('footer')
const userNameEnNavbar = document.getElementById("userName")

function loginSubmit() {
  const userID = document.getElementById("userID").value
  const pwLogin = document.getElementById("pwLogin").value
  const usuario = usuarios.find(u => u.dni == Number(userID) && u.clave === pwLogin)
  if (usuario) {

    sessionStorage.setItem('nombreDeUsuario', `${usuario.nombre} ${usuario.apellido}`)

    document.getElementById("userName").innerHTML = `Hola, ${usuario.nombre} ${usuario.apellido}`

    renderizarEscaparate()

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
  //console.log(usuarios)
}

//Buscador de DNI
function comprobadorDNI(x) {
  return usuarios.some(usuario => usuario.dni === x.value)
}

const PDF = ["ALBCUE002", "RYUCUE003", "EDUCUE004", "JULCUE005", "MARSOL006", "FEDLAI008", "JAVVAR009", "ROSLOS010", "BIBELM011", "SOFANT012", "MARTRA001"]

const libros = [
  {
    cod: "MARTRA001",
    título: "Trasnoche vudú",
    autoría: "Mariano Buscaglia",
    editorial: "Interzona",
    páginas: 146,
    año: 2015,
    ejemplares: 0,
    sinopsis: `<p dir="ltr" class="sinopsis">Un policial trastornado. Un detective privado, un encargo de apariencia sencilla, zombis, hombres-lobo, ¿perdón? ¿no-muertos?, ¿licántropos?, ¿en una novelita policial? Sí. Y además motoqueros, magia vudú, una cabeza reducida por jíbaros, un científico
    loco y su mansión-trampa que hace recordar en algún momento a ese clásico de clásicos del cine transgresor: The Rocky Horror Picture Show; y variados ingredientes que le dan condimento a una novela llena de vueltas de tuerca en un género en el que parecía ya todo dicho.</p>`
  },
  {
    cod: "ALBCUE002",
    título: "Cuentos de terror",
    autoría: "Alberto Laiseca (compilador); Edgar Allan Poe; Gustavo Adolfo Bécquer; Villiers de l'Isle-Adam; Ambrose Bierce; Bram Stoker; Lafcadio Hearn; W. W. Jacobs; Saki; Horacio Quiroga; David Herbert Lawrence; John Russell.",
    editorial: "Interzona",
    páginas: 240,
    año: null,
    ejemplares: 1,
    sinopsis: `<p class="sinopsis"><em>Cuentos de terror</em>, antes de convertirse en este libro, fue un espacio único en la televisión en el cual el rosarino Alberto Laiseca rescató la tradición del relato oral. Transmitido por la señal <em>I-Sat</em>, se volvió un ciclo de culto en el que el escritor
    narraba relatos de terror del siglo XIX. Este volumen reúne aquellos cuentos seleccionados por Laiseca y nos permite volver a oír su particular cadencia al relatar.<br /><br /> “Ya egipcios, romanos, chinos y japoneses tenían cuentos con fantasmas, seres transformados o magos que envían cocodrilos mágicos a casa de sus enemigos. La vieja pregunta es ¿por qué seguimos leyendo (o pidiendo que nos cuenten) historias terroríficas?
    En primer lugar porque nos divierten mucho. Es cosa clara. Todo lo que ‘abre puertas’ gratifica. Pero hay todavía una razón más profunda: los monstruos existen en serio y todos lo sabemos”.<br /></p>`
  },
  {
    cod: "RYUCUE003",
    título: "Cuentos japoneses",
    autoría: "Ryunosuke Akutagawa; Junichiro Tanizaki; Yukio Mishima; Shinichi Hoshi",
    editorial: "Factotum Ediciones",
    páginas: 112,
    año: 2021,
    ejemplares: 3,
    sinopsis: `<p class="sinopsis">Este libro nos permite atisbar en una cultura de comple­jidades tan intrincadas y fluctuaciones históricas tan significativas como la japonesa. A pesar de que ninguna antología podría dar una idea general de la producción literaria de un país, la magia
    impar de estos relatos encantará al lector y le acercará el sabor del lejano oriente. Desde su antiquísima tradición imperial, signada por lo simbólico y lo ceremonial, hasta la contemporaneidad de un Japón atravesado por valores occidentales, estos cuentos nos hablan de un mundo tan poco conocido como fascinante.<br /></p>`
  },
  {
    cod: "EDUCUE004",
    título: "Cuentos latinoamericanos",
    autoría: "Eduardo Galeano; Mario Benedetti; Augusto Monterroso; Julio Cortázar; Juan José Arreola; Virgilio Piñera; César Vallejo; Horacio Quiroga",
    editorial: "Factotum Ediciones",
    páginas: 120,
    año: null,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis">Estos cuentos muestran el carácter híbrido, mestizo y de vanguardia de la escritura latinoamericana: el trabajo de inscripción de una tierra, un paisaje y un mundo nuevo en una lengua ajena a ellos. Desde la reconstrucción de leyendas y mitos, e incluso su invención, hasta la representación social de la escena íntima burguesa, característica del fantástico rioplatense, estos relatos se escriben en la tensión entre lo propio y lo heredado, entre lo natural y lo extranjero.<br /></p>`
  },
  {
    cod: "JULCUE005",
    título: "Cuentos fantásticos latinoamericanos",
    autoría: "Julio Cortázar; Jorge Luis Borges; Manuel Rojas; Augusto Roa Bastos; Gabriel García Márquez; Juan José Arreola; Alejo Carpentier; Octavio Paz; Silvina Ocampo",
    editorial: "Factotum Ediciones",
    páginas: 120,
    año: 2017,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis">Lo fantástico es la irrupción de lo imposible, lo inesperado, en un contexto cotidiano. Esta antología reúne los diez más grandes exponentes del género en América Latina. Por un lado, representantes del fantástico propiamente dicho, en el Río de la Plata, y por el otro, del realismo mágico, en la zona del Caribe. El primero encuentra el asombro sobre todo en la especulación filosófica y la destreza formal; el segundo lo busca en la recuperación imaginaria del tesoro de los pueblos perdidos.<br /></p>`
  },
  {
    cod: "MARSOL006",
    título: "Solo queda saltar",
    autoría: "María Rosa Lojo",
    editorial: "loqueleo",
    páginas: 152,
    año: 2018,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis"> Corre el año 1948. La joven Celia y su hermana desembarcan en una Argentina llena de promesas. Huyen de la España franquista, de la pobreza, el hambre y la muerte de sus seres queridos. Solo se tienen la una a la otra. En una ciudad de la provincia de Buenos Aires las esperan su tío Juan, a quien nunca han visto antes, y una nueva vida por descubrir.<br/> Esta entrañable historia de María Rosa Lojo nos presenta un relato de inmigrantes muy particular, colmado de mujeres fuertes y aguerridas, que se sostienen en el dolor, el miedo, las pesadillas y la añoranza de lo que dejaron detrás.</p>`
  },
  {
    cod: "HORELT007",
    título: "El techo de incienso / Cuentos de la oficina",
    autoría: "Horacio Quiroga; Roberto Mariani",
    editorial: "Edición Biblioteca Nacional",
    páginas: 130,
    año: 1926,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis">Las diferencias de situación, contexto y sensibilidad no empañan e tema fundamental que reúne a estos notables escritores: una cierta pulsión vitalista que se propone enfrentar la crueldad del mundo, su lenguaje vacío y sus mecanismos de sujeción. Frente
    a la arbitrariedad del poder laboral siempre hubo estrategias de resistencia: la ironía, la abstención, la simulación y la redundancia son modos ambiguos de obediencia.</p>`
  },
  {
    cod: "FEDLAI008",
    título: "La imposible realidad",
    autoría: "Federico Ferroggiaro (compilador); Natalia Massei; Pablo Colacrai; Jorge Riestra; Marcelo Britos; Vanesa Gómez; Mateo Booz; Osvaldo Aguirre; Angélica Gorodischer",
    editorial: "Casagrande",
    páginas: 178,
    año: 2018,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis">Este volumen se estructura a partir las postulaciones y planteos sobre la estética realista. Se busca reunir relatos que presenten distintas realidades “representadas” o que operen como la fuente de inspiración de los mismos. Esa realidad se reinventa
    y se reconstruye en los textos literarios que pretenden dar cuenta de ella con cierta pretensión de objetividad. Es decir, generan una nueva realidad a partir de los discursos ficcionales que cuestiona, impugna o desestima la noción misma de realidad, suplantándola por la idea de “verosímil”.</p>`
  },
  {
    cod: "JAVVAR009",
    título: "Variaciones del fantástico",
    autoría: "Javier Núñez; Federico Ferroggiaro; María Florencia Moscato; Patricia Suárez; Alma Maritano; Daniel Basilio; Ber Stinco",
    editorial: "Casagrande",
    páginas: 158,
    año: 2018,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis">En este volumen se presentarán diversas definiciones del género fantástico, partiendo de la conceptualización y la clasificación de T. Todorov en <em>Introducción a la literatura fantástica</em>. Desde esta perspectiva, se ampliará la serie para incluir también a los relatos maravillosos y a los surrealistas, estableciendo una nueva clasificación que los contenga y los diferencie de los planteos del Realismo. Seguidamente, se desarrollarán los recursos retóricos característicos del género, explicados en <i>Lo fantástico </i>de Remo Ceserami, y se esbozará el funcionamiento de los mismos en los relatos que integran la antología. Por último, antes de dar lugar a los textos literarios, se reflexionará sobre los modos de irrupción de lo fantástico en diversos dominios de la vida cotidiana.</p>`
  },
  {
    cod: "ROSLOS010",
    título: "Los reinos de Poesía",
    autoría: "Rosana Guardalá (compiladora); Francisco Gandolfo; Cecilia Moscovich; José Pedroni; Emilia Bertolé; Jorge Isaías y Concepción Bertone; Beatriz Vallejo; Aguirre Molina; Hugo Padeletti; Aldo Oliva; Julia Enriquez y Andrea Ocampo; Mirta Rosemberg; Gabriela De Cicco; Estela Figueroa; Arturo Fruttero; Maia Morosano; Méndez Bujonok",
    editorial: "Casagrande",
    páginas: 108,
    año: 2018,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis">La antología se organiza en torno a un eje temático-semántico: Los Reinos de Poesía y se dividen en cuatro secciones. Ellos se tejen en la relación entre los sentidos y las emociones. Todos los reinos indagan y abordan las construcciones subjetivas, no
    como unificadas ni divididas, sino como múltiple por contradictorio:<br /><strong>1. El reino de los afectos perdidos: </strong>Nos abren en las formas del perder y las vivencias que provocan las pérdidas, una puerta para que los alumnos puedan poetizar/se, a partir de una mirada poética sobre sus propias pérdidas y cómo
    éstas nos generan, nos vuelven más o menos cariñosos, atentos y reticentes. En otras palabras, como las pérdidas nos devuelven fragmentos<br /> de lo que somos. Poetas: José Pedroni, Diana Bellessi, Gervasio Monchietti, Beatriz Vignoli y Verónica Laurino.<br /><strong>2. El reino de los mapas internos: </strong>En los poemas de esta sección los alumnos pueden ensayar nuevas cartografías personales, grupales, sociales que abran las preguntas sobre sus relaciones sociales y afectivas. Poetas: Francisco Gandolfo,
    Cecilia Moscovich, José Pedroni, Emilia Bertolé, Jorge Isaías y Concepción Bertone.<br /><strong>3. El reino de los gestos ajenos o de los recuerdos prestados:</strong> poemas que vienen a mostrar que la palabra poética se presenta como el momento en el que vivimos y revivimos a partir de imágenes que uno ya no sabe sin son propias o
    adquiridas, pero sí compartidas. Este reino les permitirá a los alumnos revisar la memoria colectiva a partir de cierta documentalidad poética<br /> no sólo histórica. Pero también, les abre paso a la escritura creativa como otro modo de pensar la memoria
    a partir de lo mínimo y comenzar a escribir una historización poética. Poetas: Beatriz Vallejo, Aguirre Molina, Hugo Padeletti, Aldo Oliva, Julia Enriquez y Andrea Ocampo.<br /><strong>4. El reino de las palabras imposibles</strong>: En este reino aparecen dinámicas del decir que dejan a la vista el lenguaje como comunicación y transparencia. La lectura vehiculiza la musicalidad del poema mostrando que no existe un modo
    sino modos decir. La voz como modo de sostener pero también de decir y de hacer. En el recorrido de estos poemas, los alumnos podrán deshacerse de la noción equívoca del lenguaje entendido como un decir siempre igual, idéntico.<br /> Los poemas que
    deambulan en este reino abren a los lectores el poder de reflexionar sobre los modos de decir, la verdad y la construcción de la realidad. Poetas: Rosemberg, Gabriela De Cicco, Estela Figueroa, Arturo Fruttero, Maia Morosano, Méndez Bujonok.</p>`
  },
  {
    cod: "BIBELM011",
    título: "El monstruo de Frankenstein",
    autoría: "Biblioteca Nacional Mariano Moreno",
    editorial: "Biblioteca Nacional Mariano Moreno",
    páginas: 119,
    año: 2018,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis"><span><strong><a href="https://www.bn.gov.ar/micrositios/exposiciones/categoria1/el-monstruo-de-frankenstein">Catálogo de la exposición llevada a cabo en la Sala Leopoldo Lugones de la Biblioteca Nacional Mariano Moreno de la República Argentina, de junio de 2018 a marzo de 2019</a>. </strong></span><em><strong><br /></strong></em><br /><em>El monstruo de Frankenstein</em> revela aspectos poco conocidos de Mary Shelley y de su obra y propone un recorrido a través de las relaciones intelectuales en las que creció la autora. Shelley, quien tenía dieciocho años cuando concibió este relato,
    utilizó elementos del gótico, del romanticismo y del positivismo, de la ciencia y del ocultismo para escribir esta novela que terminó siendo, como el engendro sin nombre de Víctor Frankenstein, una criatura heterogénea, hecha de fragmentos de distinta procedencia. <br/>La muestra exhibe ediciones ilustradas de <em>Frankenstein</em>, los libros en los que Mary Shelley se inspiró a la hora de escribir su novela, tanto científicos como filosóficos y literarios, en ediciones muy antiguas pertenecientes al acervo de la Biblioteca
    Nacional. También los textos de los padres de la escritora: Mary Wollstonecraft, autora de uno de los primeros libros feministas, <em>Vindicación de los derechos de la mujer</em>, de 1792, y William Godwin, precursor del pensamiento anarquista con<em> Investigación sobre la justicia política y su influencia en la virtud y felicidad de la gente</em>,
    de 1793. Además de una selección de fragmentos de los clásicos cinematográficos más destacados basados en <em>Frankenstein</em>, afiches de los filmes, historietas y libros infantiles que toman al monstruo como protagonista. La escenografía recrea
    el espíritu de época y las condiciones de producción del personaje. Doscientos años después de su publicación, <em>Frankenstein </em>ocupa en el imaginario popular un lugar de privilegio al que esta muestra rinde homenaje.</p>`
  },
  {
    cod: "SOFANT012",
    título: "Antología degenerada: una cartografía del lenguaje inclusivo",
    autoría: "Sofía de Mauro (compiladora); Daniela Catrileo; val flores; María Moreno; Susy Shock; Emmanuel Theumer; Lucas Monstro; Mara Glozman; Morena García; María Pia López; Maleno Damin Abba; Paula Salerno; Nadia Zúñiga; emma song; Celeste Saravia; Ga Veleizan; Javier Gasparri; Gabby De Cicco",
    editorial: "Ediciones Biblioteca Nacional",
    páginas: 265,
    año: 2021,
    ejemplares: 2,
    sinopsis: `<p class="sinopsis">Antología degenerada es un llamado por lo colectivo. Es un grito que impulsa el trazado de una cartografía insurrecta, deslenguada, atrevida, desacatada. No venimos a proponer una forma de hablar o a vaticinar un cambio lingüístico. No esperen leer en
    las próximas páginas una guía de uso, un manual de estilo, alguna definición precisa o instrucciones de corrección política. Esta antología invita a recorrer las maneras en que imaginamos habitar vidas no binarias, antipatriarcales, antirracistas,
    en un mundo que se obstina por lo binario, patriarcal y racista. Armamos una cartografía posible en torno al problema del lenguaje “inclusivo”. Posible, porque presentamos algunas formas de imaginarnos: nuestras trincheras en los márgenes del mapa
    oficial. Y hablamos de la inclusión como problema porque es un término que nos cobija y nos expulsa al mismo tiempo, nos incomoda y lo venimos a incomodar. Este libro es un problema y una posibilidad.<br /></p>`
  }

]

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
  const libroReservar = libros.find(libro => libro.cod === codLibro)
  reserva.push(libroReservar)
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

  console.log(carritoDeReservas)

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
      
      // Aumentamos en uno la cantidad de ejemplares del libro
      const libroOriginal = libros.find((l) => l.cod === libro.cod)
      if (libroOriginal) {libroOriginal.ejemplares += 1}
      
      const codigoAux = libroOriginal.cod
      const actualizarBotonStock = document.querySelector(`#`+codigoAux)
      actualizarBotonStock.textContent="Reservar"
      actualizarBotonStock.className="reservar btn btn-primary"
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

      console.log(reserva)
    })
  })
}


function renderizarEscaparate() {
  contenidoWeb.innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4" id="cards-container"> </div>`
  const escaparate = document.getElementById('cards-container')
  libros.forEach((libro) => {
    let verificacionPDF = PDF.includes(libro.cod)
    if (libro.ejemplares > 0) { verificacionEjemplar = `<button class="reservar btn btn-primary" id="${libro.cod}">Reservar</button>` } else { verificacionEjemplar = `<button type="button" class="btn btn-secondary id="${libro.cod}">Sin stock</button> ` }
    console.log(verificacionEjemplar)
    let fichaDeLibro = `
        <div class="col">
        <div class="card h-100">
        <img src="./img/${libro.cod}.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${libro.título}</h5>
        <p class="card-text">${libro.autoría}</p>
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

  const renderizarCarritoSidebar = () => {
    footer.insertAdjacentHTML('beforebegin', `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Libros elegidos para reservar</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body g-2 id"></div>
    </div>
  `)
  }


  const renderizarSidebarBtn = () => {
    userNameEnNavbar.insertAdjacentHTML('afterend', `<button class="btn btn-dark" type="button" style="margin-right: 1em" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
</svg></button>`)
  }

  renderizarSidebarBtn()
  renderizarCarritoSidebar()
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
      renderizarEscaparate()
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



// FALTA IMPLEMENTAR: CONFIRMACIÓN DE RESERVA


