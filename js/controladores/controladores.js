var pantalla = 0;
var a,b,c,ulLetra,ulLetra2;
function Controlador(ruta) {
  Controlador.vista = new Vista();
  Controlador.listaEtiquetas=[];
  Controlador.listaVerbos=[];
  Controlador.tiemposVerbales=[];
  Controlador.listaCanciones=[];
  Controlador.completar=[];
  Controlador.seleccionar=[];
  Controlador.nivel;
  Controlador.verbo;
  Controlador.cancion;
    audio = new Audio();

  // Controlador.objetoSeleccionado;
  Controlador.objetoObjetivo;
  $.getJSON( ruta, function( data ) {
      console.log("****** objeto controlador creado");
      Controlador.mainArray = data;
      console.log(data);
      Controlador.prototype.cargarEtiquetas();
    });
}

Controlador.prototype.cargarEtiquetas = function () {
maxEtiquetas = Controlador.mainArray.webApp[1].iconos.length;
  for (var i = 0; i < maxEtiquetas; i++) {
    Controlador.listaEtiquetas[i]=Controlador.mainArray.webApp["1"].iconos[i];
    console.log(  Controlador.listaEtiquetas[i]);
  }
  // console.log(Controlador.mainArray.webApp["0"].niveles["1"].actividades);
  console.log("Etiquetas del menú cargadas");
  pantalla = 1;
};

Controlador.prototype.cargarVerbos = function () {
console.log("tratando de cargar los verbos del nivel..." +Controlador.nivel);
maxVerbos = Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos.length;
console.log("cargando verbos: "+maxVerbos );
  for (var i = 0; i < maxVerbos; i++) {
    Controlador.listaVerbos[i]=Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[i].verbo[0];
  }

  console.log("Cambió el valor de pantalla a: "+pantalla);
  console.log("Verbos del Submenú cargados");
};

Controlador.prototype.verDetalle = function () {
          for (var i = 0; i < 4; i++) {
          Controlador.tiemposVerbales[i]=Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[Controlador.verbo].verbo[i];
          }
    console.log("Detalle del primer verbo cargado");
    };

Controlador.prototype.cPortada = function (img) {
  this.img = img;
  console.log("Controlador Portada");
  Controlador.vista.vPortada(this.img, "img-portada");
};

Controlador.prototype.cMenu = function () {
  aciertos=0;
  console.log("Controlador Menú");
  Controlador.vista.vEncabezado("img/logo.png","<img style='margin-left:20%; margin-top:-15px; height:10%; width:10%' src='img/icons/configurar.png' onClick='Controlador.prototype.cModal()'>","img/icons/Info.png");
  Controlador.vista.vBotones("Niveaux",Controlador.listaEtiquetas, "botones-menu");
  this.cManejadorEventoClic("botones-menu",this.cPantallas);
  console.log(Controlador.listaEtiquetas);
};


Controlador.prototype.cMenuKaraoke = function () {
  pantalla = 3;
  console.log("Controlador menú karaoké");
  Controlador.vista.vEncabezado("img/logo.png","","img/icons/Info.png");
  Controlador.vista.vMenuKaraoke("Karaoké","botones-karaoké","Chantez et pratiquez des verbes au sein de ces chansons");
  this.cManejadorEventoClic("botones-karaoké",this.cPantallas);
  Controlador.vista.vPiePantalla("","img/icons/home.PNG","");

};

Controlador.prototype.cDetalleKaraoke = function () {
  icono = "<img src=>"
  console.log("Controlador detalle karaoké");
  tituloCancion = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].titulo;
  interpreteCancion = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].artista;
  detalleCancion = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].descripcion;
  enlace1 = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].url1;
  enlace2 = Controlador.mainArray.webApp["2"].canciones[Controlador.cancion-1].url2;
  Controlador.vista.vEncabezado("img/logo.png","","img/icons/Info.png");
  Controlador.vista.vDetalleKaraoke("karaoké",tituloCancion,interpreteCancion,detalleCancion,enlace1,enlace2,"explicaciones");
  pantalla = 5;
  this.cManejadorEventoClic("botones-karaoké",this.cPantallas);
  Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","");
};

Controlador.prototype.cCreditos = function () {
  console.log("Controlador créditos");
  textoCreditos= "<strong>Auteur:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Auteur+"<br>";
  textoCreditos+= "<strong>Développeurs:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Développeurs+"<br>";
  textoCreditos+= "<strong>Graphiste y Enregistrement audio:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Graphiste_y_Enregistrement_audio+"<br>";
  textoCreditos+= "<strong>Audio:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Audio+"<br>";
  textoCreditos+= "<strong>Idée originale:</strong> "+Controlador.mainArray.webApp["3"].creditos[0].Idée_originale+"<br>";
  Controlador.vista.vCreditos("Crédits",textoCreditos);
  Controlador.vista.vPiePantalla("","img/icons/home.PNG","");

  pantalla=6;
};


Controlador.prototype.cSubMenu = function () {
  console.log("Controlador SubMenú");
  this.cargarVerbos();
  Controlador.vista.vEncabezado("","Niveaux "+(Controlador.nivel/2+1),"");
  Controlador.vista.vPiePantalla("","img/icons/home.PNG","img/icons/practicaBloqueada.png");
  Controlador.vista.vSubMenu(Controlador.listaVerbos, "botones-verbos");
  console.log("los verbos son: "+Controlador.listaVerbos);
  pantalla = 2;
  this.cManejadorEventoClic("botones-verbos",this.cPantallas);

};


Controlador.prototype.cAudios = function() {
  var cual = $(this).attr('id').charAt($(this).attr('id').length-1);
  console.log(cual);
  if (cual < 3) {

    textoASonar = minusculaPrimera(comprueba(Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[Controlador.verbo].verbo[cual]));
    if (textoASonar=="read" && cual == 0) {Audio.prototype.vAudios("audios/readp.mp3");}
else {
  temp = compruebaE(textoASonar);
  temp = compruebaI(temp);
  temp = compruebaO(temp);
  temp = compruebaA(temp);
  temp = compruebaU(temp);
  Audio.prototype.vAudios("audios/"+temp+'.mp3');
  // console.log(Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[Controlador.verbo].verbo[cual]);
}
}
  else {
    var nuevo = '#verbo'+cual;
    $(nuevo).text(Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[Controlador.verbo].verbo[cual]);
    console.log("Escribir significado");
    setTimeout(function() {
        $(nuevo).text("Sens");
}, 2000);
    }
};

Controlador.prototype.cDetalleVerbo = function () {
  Controlador.vista.vEncabezado("","Niveaux "+(Controlador.nivel/2+1),"");
  Controlador.prototype.verDetalle();
  Controlador.vista.vDetalleVerbo(Controlador.tiemposVerbales, "detalle-verbos");
  $("#verbo0").click(Controlador.prototype.cAudios);
  $("#verbo1").click(Controlador.prototype.cAudios);
  $("#verbo2").click(Controlador.prototype.cAudios);
  $("#verbo3").click(Controlador.prototype.cAudios);
  console.log("Controlador Detalle Verbo");
  Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","");
};


Controlador.prototype.cModal = function () {
    console.log("Controlador Modal");
    Controlador.vista.vModal("Configuración");
};

Controlador.prototype.cEliminarPantalla = function () {
  console.log("Controlador Eliminar Pantalla");
    $("#contenedor").remove();
    var objContenedor = $("<div></div>");
    $(objContenedor).attr("id","contenedor");
    $(objContenedor).css("display","none");
    $("#cuerpo").append(objContenedor);
    $("#contenedor").fadeIn(500);
};



Controlador.prototype.cManejadorEventoClic = function (clase, metodo) {
  console.log("Controlador Evento Click para la pantalla: "+pantalla);
  this.clase = clase;
  this.metodo = metodo;
  if (pantalla == 1) {
  $("img").click(function(){
          Controlador.nivel = (this.id.charAt(5)-1)*2;});
          console.log("dio clic al nivel: "+Controlador.nivel/2 );
          console.log("Pantalla."+pantalla);
      }
  if (pantalla == 2) {
    $("button").click(function(){
          Controlador.verbo = this.id.charAt(3);});
          console.log("dio clic al verbo: "+Controlador.verbo);
          console.log("Pantalla.."+pantalla);
  }
  if (pantalla == 3) {
    $("img").click(function(){
    Controlador.cancion = this.id.charAt(7);});
    console.log("dio clic a la canción: "+Controlador.cancion);
    console.log("Pantalla..."+pantalla);
    pantalla=4;
  }

  if (pantalla == 4) {
    console.log("Canción #"+Controlador.cancion);
    console.log("Pantalla...."+pantalla);
    // pantalla = 5;
  }

  if (pantalla == 5) {
    console.log("Abriendo modal");
    console.log("Pantalla...."+pantalla);
  }

  if (pantalla ==6) {
    console.log("Abriendo creditos");
    console.log("Pantalla...."+pantalla);
  }

  if (pantalla ==7) {
    console.log("Abriendo Actividades");
    console.log("Pantalla...."+pantalla);
  }

  $("."+this.clase).click(this.metodo);

};

Controlador.prototype.cPantallas = function () {
    Controlador.prototype.cEliminarPantalla();
    var opcion = pantalla;
    // this.id.slice(5);
    console.log("*****Pantalla: "+pantalla);
    switch (pantalla) {
      case 1:
        Controlador.prototype.irSubMenu();
      break;
      case 2:
        Controlador.prototype.irDetalle();
      break;
      case 3:
        Controlador.prototype.irMenuKaraoke();
      break;
      case 4:
        Controlador.prototype.irDetalleKaraoke();
      break;
      case 5:
        Controlador.prototype.irAModal();
      break;
      case 6:
        Controlador.prototype.irACreditos();
      break;
      case 7:

        Controlador.prototype.irAActividades();
      break;
          default:

    }

  };

Controlador.prototype.irMenu = function () {
    Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cMenu();
};

Controlador.prototype.irMenuKaraoke = function(){
  Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cMenuKaraoke();
};

Controlador.prototype.irDetalleKaraoke = function(){
  Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cDetalleKaraoke();
};

Controlador.prototype.irACreditos = function(){
  Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cCreditos();
};

Controlador.prototype.irSubMenu = function () {
    Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cSubMenu();
};

Controlador.prototype.irDetalle = function () {
    Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cDetalleVerbo();
};

Controlador.prototype.irAModal = function () {
    // Controlador.prototype.cEliminarPantalla();
    Controlador.prototype.cModal();
};

Controlador.prototype.irAActividades = function () {
      Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cActividades(Controlador.nivel);
};

Controlador.prototype.sonarAudios = function () {
  Controlador.prototype.cAudios = function () {
  };
};

Controlador.prototype.cComparar = function (elemento1,elemento2) {
  if (elemento1== elemento2)
  {
    console.log("Son iguales");
  } else {
    console.log("Son diferentes las dos");
  }
};

Controlador.prototype.cActividades = function (tipo) {
  console.log(tipo);

  switch (tipo) {
    case 1:
      {
        Controlador.prototype.actividadCompletar(1);
      }
      break;
    case 2:
      {
        Controlador.prototype.actividadSeleccionar(2);
      }
      break;
      case 3:
        {
          Controlador.prototype.arrastrar(5,"Emportez la forme correcte du verbe pour completer la phrase.")
        }
        break;

      case 4:
        {
          Controlador.prototype.arrastrar(7,"Choisissez le verbe correct pour l'image correspondante.")
        }
        break;

        case 5:
          {
            Controlador.prototype.actividadCompletar(5);
          }
          break;

        case 6:
          {
            Controlador.prototype.actividadSeleccionar(6);
          }
          break;

    default:

  }


  pantalla=7;
};

Controlador.prototype.actividadCompletar = function (nivel) {
  console.log("El nivel actual es el "+((Controlador.nivel/2)+1));
if (nivel == 1) {
    Controlador.completar = Controlador.mainArray.webApp["0"].niveles[nivel].actividades;
  }
  if (nivel == 5) {
      Controlador.completar = Controlador.mainArray.webApp["0"].niveles[nivel+4].actividades;
    }
    console.log("Total de preguntas del nivel: "+ Controlador.completar.length);
    console.log(Controlador.completar);
    Vista.prototype.vEncabezado("img/icons/llave-M.png"," "+(nivel),"");
      Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","img/icons/llave-inactiva.png");
    Vista.prototype.vCompletar();

};


Controlador.prototype.actividadSeleccionar = function (nivel) {
  console.log(nivel);
  if (Controlador.nivel == 2) {
    Controlador.seleccionar = Controlador.mainArray.webApp["0"].niveles[nivel+1].actividades;
    }
  if (Controlador.nivel == 10) {
    Controlador.seleccionar = Controlador.mainArray.webApp["0"].niveles[nivel+5].actividades;
  }
    console.log("Total de preguntas del nivel 2: "+ Controlador.seleccionar.length);
    console.log(Controlador.seleccionar);
    Vista.prototype.vEncabezado("img/icons/llave-M.png"," "+(nivel),"");
    Vista.prototype.vSeleccionar();
    Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","img/icons/llave-inactiva.png");
};

Controlador.prototype.arrastrar = function (actividad, indicaciones) {
  console.log("Tamaño: "+Controlador.mainArray.webApp["0"].niveles[actividad].actividades.length);
if (Controlador.nivel == 4) {
  Controlador.vista.vEncabezado("img/icons/llave-M.png"," 3","");}
  if (Controlador.nivel == 6) {
    Controlador.vista.vEncabezado("img/icons/llave-M.png","Niveaux 4","");}
    Controlador.vista.vPiePantalla("img/icons/Izquierda-T.png","img/icons/home.PNG","img/icons/llave-inactiva.png");
  Controlador.vista.vActividadDrag(Controlador.mainArray.webApp["0"].niveles[actividad].actividades,5,indicaciones);
  Controlador.vista.vActividadDrop(Controlador.mainArray.webApp["0"].niveles[actividad].actividades.imagen);
  Controlador.prototype.cActivarDrapDrop();


};

  Controlador.prototype.cActivarDrapDrop = function () {
    //Activa las propiedades Drag and Drop de los elementos respectivos

    $(".arrastrable").draggable({

          containment: '#espacioArrastrable', scroll: false, start: function (event, ui) {
            Controlador.objetoSeleccionado = event.target.id;
            console.log(Controlador.objetoSeleccionado);
          }

        });


    $(".soltable").droppable({
          drop: function (event, ui ) {
              console.log("Nivel actual: "+((Controlador.nivel/2)+1));
              posible= event.target.id;
              console.log(posible);
              if (Controlador.nivel == 4) {palabraAEvaluar = palabraCorrecta}
              if (Controlador.nivel == 6) {palabraAEvaluar = posible}
               if (Controlador.objetoSeleccionado== palabraAEvaluar) {
                 document.getElementById('vacio').style.color = 'green';
                 document.getElementById('vacio').innerHTML = palabraAEvaluar+" ";
                  document.getElementById('correct').play();
                 document.getElementById('vacio').innerHTML = palabraAEvaluar.bold()+" <span class='glyphicon glyphicon-ok'> ";
            }
            else{
                if (Controlador.nivel == 4) {
                document.getElementById('vacio').innerHTML = Controlador.objetoSeleccionado+" ";
                document.getElementById('vacio').style.color = 'red';
                document.getElementById('vacio').innerHTML = Controlador.objetoSeleccionado.bold()+"<span class='glyphicon glyphicon-remove'> ";}
                document.getElementById('wrong').play();
            }
              document.getElementById(Controlador.objetoSeleccionado).style.display = 'none';
              deshabilitar();
          }
        });
  }

function comprueba(palabra){
var contenido=""
for (var i = 0; i < palabra.length; i ++){
contenido += (palabra.charAt(i) == " " || palabra.charAt(i) == "/" || palabra.charAt(i) == "'"  ) ? "-" : palabra.charAt(i);
}//fin del for
return contenido;
}

function compruebaA(palabra){
var contenido=""
for (var i = 0; i < palabra.length; i ++){
contenido += (palabra.charAt(i) == "à" || palabra.charAt(i) == "á" ) ? "a" : palabra.charAt(i);
}//fin del for
return contenido;
}

function compruebaE(palabra){
var contenido=""
for (var i = 0; i < palabra.length; i ++){
contenido += (palabra.charAt(i) == "è" || palabra.charAt(i) == "é" || palabra.charAt(i) == "ê"  ) ? "e" : palabra.charAt(i);
}//fin del for
return contenido;
}

function compruebaI(palabra){
var contenido=""
for (var i = 0; i < palabra.length; i ++){
contenido += (palabra.charAt(i) == "ì" || palabra.charAt(i) == "í" ) ? "i" : palabra.charAt(i);
}//fin del for
return contenido;
}


function compruebaO(palabra){
var contenido=""
for (var i = 0; i < palabra.length; i ++){
contenido += (palabra.charAt(i) == "ò" || palabra.charAt(i) == "ó" ) ? "o" : palabra.charAt(i);
}//fin del for
return contenido;
}

function compruebaU(palabra){
var contenido=""
for (var i = 0; i < palabra.length; i ++){
contenido += (palabra.charAt(i) == "ù" || palabra.charAt(i) == "ú" ) ? "u" : palabra.charAt(i);
}//fin del for
return contenido;
}


function minusculaPrimera(string){
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function pasarAMinuscula(string) {
  return string.toLowerCase();
}
