Vista.urlOficial;
Vista.urlLetra;
var buenas, llenas;
var ejercicio=0;
var aciertos = 1;
var totalEjercicios = 0;
var nivelActual;
var verbosCliqueados = [];
var nivelesCompletados = [];
var audio;

function Vista() {
console.log(localStorage.getItem("VerbosVistos"));
  if ((localStorage.getItem("VerbosVistos") === null) || (typeof localStorage.getItem("VerbosVistos") === 'undefined')) {
    verbosCliqueados = [];
    nivelesCompletados = [];
    localStorage.setItem("VerbosVistos", JSON.stringify(verbosCliqueados));
    localStorage.setItem("nivelesVistos", JSON.stringify(nivelesCompletados));
    console.log("localStorage vacía, creada de nuevo...");
    }
    else{
      // verbosCliqueados=localStorage.getItem('VerbosVistos');
      verbosCliqueados=localStorage.getItem("VerbosVistos");
      var verbosCliqueados = JSON.parse(localStorage.getItem("VerbosVistos"));
      var nivelesCompletados = JSON.parse(localStorage.getItem("nivelesVistos"));
      console.log("Esos son los verbos ya cliqueados:");
      console.log(verbosCliqueados);
    }
  if (localStorage.getItem("ultimoNivel") === null) {
    localStorage.setItem("ultimoNivel", "1");
    console.log("Valor de localStorage= "+localStorage.getItem("ultimoNivel"));
    console.log("Valores en el arreglos=" + verbosCliqueados);
}

if ((localStorage.getItem("nivelCompleto") === null) || (typeof localStorage.getItem("nivelCompleto") === 'undefined')) {
  var completo="false";
  localStorage.setItem("nivelCompleto", JSON.stringify(completo));
}

  console.log("****** objeto vista creado");
}

  $("#ui-loader").attr("visibility","hide" );


Vista.prototype.vPortada = function (rutaImg, clase) {
  console.log("ultimo nivel logrado: "+ localStorage.getItem("ultimoNivel"));
  var objeto = $("<img>");
  $(objeto).attr("src",rutaImg);
  $(objeto).attr("class",clase)
  $("#contenedor").append(objeto);
};



Vista.prototype.vBotones = function (texto, etiquetas, clase) {

  var cont, ico, maxBotones=6;
  $("#contenedor").append("<center><img width='10%' height='10%' display='inline' src='img/icons/llave-T.png'><h1 display='inline'>"+texto+"</h1></center>");
  $("#contenedor").append("<div class='row'>");
  $("#contenedor").append("<div id='botonera1' class='col-xs-6'></div>");
  $("#contenedor").append("<div id='botonera2' class='col-xs-6'></div>");
  $("#contenedor").append("</div");
  for (var i = 0; i < maxBotones; i++) {
    if ((i+1)>localStorage.getItem("ultimoNivel")) {
      etiquetas[i] = "n"+(i+1);
    }
      else {
        etiquetas[i] = "na"+(i+1);
      }
    // Crea el objeto imagen:
    ico = $("<img>");
    $(ico).attr("src","img/niveles/"+etiquetas[i]+".png");
    $(ico).attr("id", "nivel"+(i+1));
    $(ico).attr("alt","nivel "+(i+1));
    $(ico).attr("class","img-responsive");
    // Le asigna la clase:
    $(ico).addClass(clase);

    if (i<3) {
      $("#botonera1").append(ico);
      $("#botonera1").attr("align","right");
    }

    if (i>2) {
      $("#botonera2").append(ico);
    }
    // Se agrega el objeto al DOM
if ((i+1)>localStorage.getItem("ultimoNivel")) {
    $("#nivel"+(i+1)).removeClass("botones-menu");
    $("#nivel"+(i+1)).addClass("botones-menu-inactivo");
}

  $("#nivel"+localStorage.getItem("ultimoNivel")).addClass("charSelected");

  }

  var ventanaVideo = ("<div id='myModal' class='modal'>");
  ventanaVideo += ("<div class='modal-content'>");
  ventanaVideo += ("<div class='modal-header'>");
  ventanaVideo += ("<span class='close'>&times;</span>");
  ventanaVideo += ("<h3>Setup</h3></div>");
  ventanaVideo += ("<div class='modal-body' id='modalVideo'>");
  ventanaVideo += ("<br><p id='reset'> <span class='glyphicon glyphicon-refresh'></span> Réinitialiser mes progrès</p>");
  ventanaVideo += ("<div id='confirmacion'><p > Êtes-vous sûr de vouloir réinitialiser votre progression?</p>");
  ventanaVideo += ("<br><br><center><div class='row'> <div id='yes' class='col-xs-6'>Oui</div><div id='no' class='col-xs-6'>NO</div>");
  ventanaVideo += ("</div> </div></div></div>");
  $("#contenedor").append(ventanaVideo);
  $('#no').attr("onClick","salir()");
  $('#yes').attr("onClick","salirYResetear()");

  $("#reset").attr("onClick","resetear()")
    karaoke = $("<img>");

  $(karaoke).attr("width","75%");
  $(karaoke).attr("height","75%");
  $(karaoke).attr("class","img-responsive");
  $(karaoke).attr("onClick","javascript:irMenuKaraoke()")
  $(karaoke).attr("src","img/icons/btnKaraoke.png");
    $(karaoke).attr("style","margin: 0 auto");
  $("#contenedor").append(karaoke);

  $("#icoDerecha").attr ("onClick","Controlador.prototype.irACreditos()");
  };


  Vista.prototype.vMenuKaraoke = function (texto,clase, instrucciones) {
    var kar, maxBotones=8;

    $("#contenedor").append("<center><img width='10%' height='10%' src='img/icons/Microfono-T.png'><h1>"+texto+"</h1></center><br>");
    $("#contenedor").append("<p class='instrucciones'>"+instrucciones+"</p>");
    $("#contenedor").append("<center><div id='botonera' class='col-xs-12'></div></center>");
    for (var i = 0; i < maxBotones; i++) {
      // Crea el objeto imagen:
      kar = $("<img>");
      if (i<2 || localStorage.getItem("ultimoNivel") >= i ) {
        $(kar).attr("src","img/karaoke/cancion"+i+".png");
        $(kar).addClass(clase);
      }
      else   {
        $(kar).attr("src","img/karaoke/cancion"+i+"b.png");
        $(kar).addClass("botones-karaoke-Inactivos");
      }

      $(kar).attr("width","96");
      $(kar).attr("id", "cancion"+(i+1));
      $(kar).attr("height","96");
      $(kar).attr("alt","cancion "+(i+1));
      $(kar).attr("aling","center");



      $("#botonera").append(kar);
      // Se agrega el objeto al DOM
      $("#contenedor").addClass("pantallas");
      $("#icoDerecha").attr ("onClick","Controlador.prototype.irACreditos()");


    }
  };


  Vista.prototype.vDetalleKaraoke = function (texto, titulo,cantante,explicacion,urlOficial, urlLetra, clase) {
    Vista.urlOficial=urlOficial;
    Vista.urlLetra=urlLetra;

    acceso1 = $("<img>");
    $(acceso1).attr("src","img/karaoke/karaoke"+(Controlador.cancion-1)+".png");
    $(acceso1).attr("width","30%");
    $(acceso1).attr("height","30%");
    $(acceso1).attr("id","MyBtn");
    $(acceso1).attr("onClick", "location.href=Vista.urlOficial");

    acceso2 = $("<img>");
    $(acceso2).attr("src","img/karaoke/lyric"+(Controlador.cancion-1)+".png");
    $(acceso2).attr("width","30%");
    $(acceso2).attr("height","30%");
    $(acceso2).attr("id","MyBtn2");
    poner2=urlLetra;
    $(acceso2).attr("onClick", "location.href=Vista.urlLetra")

    ;
    $("#contenedor").append("<center><img width='10%' height='10%' src='img/icons/Microfono-T.png'><h1>"+texto+"</h1></center>");
    $("#contenedor").append("<div id='detalle-karaoke'>");
        $("#detalle-karaoke").append("<h3><strong>"+titulo+"</strong><h3");
        $("#detalle-karaoke").append("<strong>"+cantante+"</strong><br>");

        $("#detalle-karaoke").append("<br>");
        $("#detalle-karaoke").append(acceso1);
        $("#detalle-karaoke").append(acceso2);
        $("#contenedor").append("</div>");
      $("#contenedor").addClass("pantallas");
      $("#icoDerecha").attr ("onClick","Controlador.prototype.irACreditos()");
  };

Vista.prototype.vCreditos = function (titulo,texto) {

  $("#contenedor").append("<br><center><h1>"+titulo+"</h1></center><br>");
  $("#contenedor").append("<p id='creditos'>"+texto+"</p><br>");
  $("#contenedor").append("<center><img id='logoApp' src='img/logo.png' ></center><br>");
  $("#contenedor").append("<center><img id='logoMep' src='img/mep.png' ></center>");

};

Vista.prototype.vSubMenu = function (etiquetas, clase) {
  console.log("Nivel Actual: " +((Controlador.nivel/2)+1));
  ejercicio=0;
  aciertos=0;
  var btn, maxBotones=10;
  if (localStorage.getItem("VerbosVistos") != null) {
      verbosCliqueados=JSON.parse(localStorage.getItem("VerbosVistos"));

    }

console.log(verbosCliqueados.indexOf(etiquetas[0]));
  if (verbosCliqueados.indexOf(etiquetas[0]) < 0){
       if(typeof(siguiente) != "undefined") {
         siguiente = siguiente + 1;
         if (verbosCliqueados.indexOf(etiquetas[siguiente]) < 0){
            verbosCliqueados.push(etiquetas[siguiente]);
          }
        localStorage.setItem("VerbosVistos", JSON.stringify(verbosCliqueados));
        console.log("Ahora siguiente=" + siguiente);
    }
    else {
      var siguiente = 0;
      console.log("Limpié el arreglo...");
      verbosCliqueados.push(etiquetas[siguiente]);
      localStorage.setItem("VerbosVistos", JSON.stringify(verbosCliqueados));
      console.log("siguiente=" + siguiente);
    }

  }

  $("#contenedor").append("<div id='botonera1' class='col-xs-6'></div>");
  $("#contenedor").append("<div id='botonera2' class='col-xs-6'></div>");
  $("#contenedor").append("</div");
  for (var i = 0; i < maxBotones; i++) {
    // Crea el objeto boton:
    btn = $("<button></button>");
    // le asigna el ID y el name:
    $(btn).attr("type","button");
    $(btn).attr("id","btn"+i);
    $(btn).attr("name","Botón "+i);
    $(btn).attr("class","btn btn-primary btn-xs");

    // Se le agrega la etiequeta:
    $(btn).text(etiquetas[i]);
    if (etiquetas[i].length>7) {
      $(btn).attr("class","botones-verbosXL");

    }

    // Le asigna la clase:

    if (verbosCliqueados.indexOf(etiquetas[i]) < 0){
    $(btn).addClass("botones-verbosBloqueados");
    $(btn).attr("style","background-color:rgb(239,238,238);color: rgb(169,165,164)");
    }
  else{
      $(btn).addClass(clase);
      $(btn).attr("style","background-color:#005386");

      var siguiente=siguiente + 1;

  }
    // Se agrega el objeto al DOM
    $("#contenedor").addClass("pantallas");
    if (i<5) {
      $("#botonera1").append(btn);
        $("#botonera1").attr("align","right");
    }

    if (i>4) {
      $("#botonera2").append(btn);
    }
  }

  residuo=verbosCliqueados.length % 10;

  var temp = localStorage.getItem('VerbosVistos');
  temp = JSON.parse(temp).length;
  if (temp>10) {
    temp= temp.toString().slice(1);
    // temp = temp.slice(1);
  }
  console.log("***************");
  console.log((Controlador.nivel/2+1));
  console.log(JSON.parse(localStorage.getItem('ultimoNivel')));

  var elementos = $('.visto');
  var size = elementos.size();
  var verbosTemp=JSON.parse(localStorage.getItem('nivelesVistos'))
  // console.log("Indice :"+nivelesVistos.indexOf((Controlador.nivel/2)+1));
  if ((verbosTemp.indexOf((Controlador.nivel/2)+1) < 0) && ((Controlador.nivel/2+1)>=JSON.parse(localStorage.getItem('ultimoNivel'))) && size < 10) {
    if (verbosCliqueados.indexOf(etiquetas[siguiente]) < 0) {
      // if ((Controlador.nivel/2)+1 ==1 ) {
      if (temp==0) {
        temp = 1;
      }

          $("#btn"+(temp-1)).addClass("charSelected");
          console.log("#btn"+(temp-1));

    }
  }

console.log(temp);

console.log("nivel Actual es" +(Controlador.nivel/2+1));

console.log("Ya tienen la clase BV: "+size);
  if ( (residuo=="0") && ($("#btn9").hasClass('botones-verbos')) && !($("#btn9").hasClass('charSelected')) || (Controlador.nivel/2+1)<JSON.parse(localStorage.getItem('ultimoNivel') ) ) {
    console.log("Ya vale 10......Debería de cambiar...");
    $("#botonDerecho").attr("src","img/icons/practica.png");
    $("#botonDerecho").attr("class","logo");
    $("#botonDerecho").attr("onClick","irActividad(Controlador.nivel)");
  }

};

Vista.prototype.vDetalleVerbo = function (etiquetas, clase) {
  var btn, maxBotones=4;
  console.log("Esto ya se ve");
  var titulos = ["Infinitif","Passé composé","Futur simple"];
  $("#contenedor").append("<audio id='audio1' src='audios/intro.mp3'></audio>");
  $("#contenedor").append("<center><div id='botonera' class='col-xs-12'></div></center>");
  for (var i = 0; i < maxBotones; i++) {
    // Crea el objeto boton:
    btn = $("<button></button>");
    // le asigna el ID y el name:
    $(btn).attr("type","button");
    $(btn).attr("id","verbo"+i);
    $(btn).attr("name",etiquetas[i]);

    if (i==0) {

        siguiente = Controlador.listaVerbos.indexOf(etiquetas[0]) + 1;
        temporal = Controlador.listaVerbos.indexOf(etiquetas[0]);


        if (siguiente==10) {
          console.log("Intentando cambiar a TRUE.....");
          completo="true";
          var temp=JSON.parse(localStorage.getItem('nivelesVistos'))

          if (temp.indexOf((Controlador.nivel/2)+1) < 0) {
            nivelesCompletados.push((Controlador.nivel/2)+1);
            localStorage.setItem("nivelesVistos", JSON.stringify(nivelesCompletados));
          }
          localStorage.setItem("nivelCompleto", JSON.stringify(completo));
            siguiente = 1;

        }

        console.log(verbosCliqueados.length);
        console.log("el que sigue es: " +siguiente);
         if (verbosCliqueados.indexOf(Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[siguiente].verbo[0]) < 0) {
        verbosCliqueados.push(Controlador.mainArray.webApp["0"].niveles[Controlador.nivel].verbos[siguiente].verbo[0]);
        localStorage.setItem("VerbosVistos", JSON.stringify(verbosCliqueados));

          }
    }


    $(btn).attr("class","btn btn-primary btn-md");
    // Se le agrega la etiqueta:
    if (i<maxBotones-1){

      $(btn).text(etiquetas[i]);}
    else {$(btn).text("Sens");
          $(btn).attr("class","rosada")
          }
    // Le asigna la clase:
    $(btn).addClass(clase);
    // Se agrega el objeto al DOM
    if (i<3) {
        $("#botonera").append("<p class='titulos'>"+titulos[i]+"</p>");
    }
    if (i>2) {
        $("#botonera").append("<br><br><br>");
    }

    $("#contenedor").addClass("pantallas");
    $("#botonera").append(btn);

    $("#icoDerecha").attr("onClick","play()")
  }
};


Vista.prototype.vActividades = function (nivel) {
  objDiv = $("<div></div>");
  $(objDiv).attr("id","actividad"+nivel);
  $(objDiv).attr("class","pantallas");
  var objHtml = "<h1>Actividades del nivel " + nivel + "</h1>";
  objHtml += "<p>Estas son las consignas de la actividad</p>";
  objHtml += "<p>Actividad 1</p>";
  objHtml += "<p>Actividad 2</p>";
  objHtml += "<p>Actividad 3</p>";
  objHtml += "<p>Actividad 4</p>";
  objHtml += "<p><button id='btnHome' class='botones-menu'>HOME</button></p>";
  $(objDiv).html(objHtml);
  $("#contenedor").append(objDiv);
};

Vista.prototype.vModal = function (cual) {
var modal = document.getElementById('myModal');
var objeto = document.getElementById('embebido');
var span = document.getElementsByClassName("close")[0];

modal.style.display = "block";

span.onclick = function() {
    modal.style.display = "none";
    $(objeto).attr("src","");
      $('#confirmacion').attr("style","visibility:hidden");
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $(objeto).attr("src","");
        $('#confirmacion').attr("style","visibility:hidden");
    }
}
};

Audio.prototype.vAudios = function (rutaAudio) {
  this.audio = rutaAudio;
  console.log(this.audio);
  $(".audios").remove();
  $("#contenedor").append("<audio class='audios' id='sonido'><source src='"+this.audio +"' type='audio/mpeg'></audio>");
  document.getElementById("sonido").play();
  $(document.getElementById("sonido")).clearQueue();
  console.log(this);
  $(this).clearQueue();

  };

  Vista.prototype.vSeleccionar = function() {
    buenas=0;
    llenas=0;
    var listaObjetosHTML=[], objetoHTML, maxItems=Controlador.seleccionar.length;


    objHtml = "<h4>Choisissez la forme verbale correcte pour completer la phrase.</h4><br>";
    console.log("Cantidad de ítems:"+maxItems);
    var respuestas = [];
    for (var i = 0; i < maxItems; i++) {
        opciones = "<select class='ui-select' class='seleccionables'  onblur='cajasLlenas("+i+")' id=respuesta"+i+">";
        opciones += "<option selected='true' disabled></option>";
        opciones += "<option>"+Controlador.seleccionar[i].verbo1+"</option>";
        opciones += "<option>"+Controlador.seleccionar[i].verbo2+"</option>";
        opciones += "</select>";
        listaObjetosHTML += (i+1)+". "+ Controlador.seleccionar[i].parte1+" "+opciones+" ";

        respuestas[i] = $("#respuesta"+i);
        listaObjetosHTML +=  Controlador.seleccionar[i].parte2+" <br><p class='renglones'></p>";
console.log("Agregadas las opciones del item" + i);
    }
    listaObjetosHTML += "<br><center><img class='bntCheck' id='btnRevisar' src='img/icons/doneInactivo.png'></center>";
    $(objHtml).attr("style","color: rgb(86,87,92)");
    $("#contenedor").addClass("textoItemes");
    $("#contenedor").attr("style","padding-left: 20px; padding-right: 20px");
    $("#contenedor").append(objHtml)
    $("#contenedor").append("<div class='scroll'>"+listaObjetosHTML+"</div>");

  };


  Vista.prototype.vCompletar = function() {
    buenas=0;
    llenas=0;

    var listaObjetosHTML=[], objetoHTML, maxItems=Controlador.completar.length;
    objHtml = "<h4>Completez les phrases, Mettez le verbe dans la forme correcte</h4><br>";
    console.log("Cantidad de ítems:"+maxItems);


    var respuestas = [];
    for (var i = 0; i < maxItems; i++) {
        listaObjetosHTML += (i+1)+". "+ Controlador.completar[i].parte1+" <input type='text' class='paraEscribir' onblur='cajasLlenas("+i+")'";
        listaObjetosHTML += "id= respuesta"+i+"\n";
        respuestas[i] = $("#respuesta"+i);

        listaObjetosHTML +=  "> "+Controlador.completar[i].parte2+" <strong>("+Controlador.completar[i].verbo+")</strong><br><p class='renglones'></p>";

    }
        listaObjetosHTML += "<br><center><img class='bntCheck' id='btnRevisar' src='img/icons/doneInactivo.png'></center>";
    $(objHtml).attr("style","color: rgb(86,87,92)");
    $("#contenedor").addClass("textoItemes");
    $("#contenedor").attr("style","padding-left: 20px; padding-right: 20px");
    $("#contenedor").append(objHtml)
    $("#contenedor").append("<div class='scroll'>"+listaObjetosHTML+"</div>");

    var initialScreenSize = window.innerHeight;
    window.addEventListener("resize", function() {
    if(window.innerHeight < initialScreenSize){
        $("[data-role=footer]").hide();
      }
    else{
        $("[data-role=footer]").show();
      }
    });

  };

  Vista.prototype.vActividadDrag = function (listaActividad,cantidad,instrucciones) {
    var listaObjetosHTML=[], objetoHTML, maxItems=listaActividad.length;
    totalEjercicios=maxItems;
    $("#contenedor").append("<audio id='correct' src='audios/correct.mp3'></audio>");
    $("#contenedor").append("<audio id='wrong' src='audios/wrong.mp3'></audio>");
    $("#contenedor").append("<h4>"+instrucciones+"</h4>");
    switch (Controlador.nivel-1) {
      case 3:
        for (var i = 0; i < cantidad; i++) {
              objetoHTML = $("<div></div>");
              $(objetoHTML).text(listaActividad[ejercicio].elementos[i]);
        $(objetoHTML).attr("class", "arrastrable tarjetasPeq");

        $(objetoHTML).attr("id", listaActividad[ejercicio].elementos[i]);
        listaObjetosHTML.push(objetoHTML);
      }
      $("#contenedor").append("<br><div id='espacioArrastrable'>");
      $('#espacioArrastrable').addClass("espacioDisponible");
      $('#espacioArrastrable').addClass("textoItemes");
        $("#espacioArrastrable").append(listaObjetosHTML);
        $("#espacioArrastrable").append("<br><br><br>");
        $("#espacioArrastrable").append("<span>"+listaActividad[ejercicio].parte1+"</span>");
        $("#espacioArrastrable").append("<div id='vacio' class='camposVacios'>___________ </div>");
        $("#vacio").attr("style","padding-top:30px");
        $("#espacioArrastrable").append("<span>"+listaActividad[ejercicio].parte2+"</span>");
        $("#espacioArrastrable").append("<br>");
      break;

      case 5:
      for (var i = 0; i < 3; i++) {
              objetoHTML = $("<div id=soy"+listaActividad[ejercicio].elementos[i]+"></div>");
              $(objetoHTML).text(listaActividad[ejercicio].elementos[i]);
              listaObjetosHTML.push(objetoHTML);
              listaObjetosHTML.push("<br><br>");
          }
          // id='vacio'
          // <div id='espacioArrastrable'>
        $("#contenedor").append("<p class='renglones'></p><div class='row'> <br><br><div  class='col-xs-6'><br><img id="+listaActividad[ejercicio].correcta+" src=img/draws/"+listaActividad[ejercicio].imagen+"></div><div id='lateral' style= 'display: inline-block' align='right' class='col-xs-6'>");
        $('#espacioArrastrable').addClass("espacioDisponible");
        $("#lateral").append(listaObjetosHTML);
        $("#contenedor").append("</div></div>");

        // $("#"+listaActividad[ejercicio].correcta).attr("height","200%");
        elemento= listaActividad[ejercicio].elementos[0];
          for (var i = 0; i < 3; i++) {
            quien = "soy"+listaActividad[ejercicio].elementos[i];
            es = "soy"+listaActividad[ejercicio].correcta;
            $("#soy"+listaActividad[ejercicio].elementos[i]).attr("onClick","animar('"+quien+"','"+es+"','"+i+"')");
            $("#soy"+listaActividad[ejercicio].elementos[i]).attr("class","tarjetas");
          }

        //
        // $("#"+listaActividad[ejercicio].correcta).attr("class","soltable");
          $("#"+listaActividad[ejercicio].correcta).addClass("dibujoVerbo");
          $("#"+listaActividad[ejercicio].correcta).addClass("img-responsive");
        break;
        default:
    }

    $("#contenedor").attr("style","padding-left: 20px; padding-right: 20px; font-family: 'Muli'; font-size: 16px;");
    $("#contenedor").append("<img id='next' class='btnRevisar' align=right src='img/icons/nextInactivo.png'><br>");
    palabraCorrecta = listaActividad[ejercicio].correcta;
  };

 Vista.prototype.vActividadDrop = function (objetivo) {

   $( ".camposVacios" ).attr("class", "soltable");
    $( ".palabras" ).attr("class", "palabras soltable sortable");
    $( "#lateral" ).attr("style", "display: inline-block");

      $( ".palabras" ).droppable({

          classes: {
            "ui-droppable-hover": "ui-state-hover"
          }
        });

        $( "#vacio" ).droppable({

            classes: {
              "ui-droppable-hover": "ui-state-hover"
            }
          });

};


Vista.prototype.vPiePantalla = function(boton1,boton2,boton3) {

pie = $("<div data-role='footer' padding-bottom=5px data-position='fixed' class='custom_footer' data-theme='b' data-tap-toggle='false'></div>");
  var objHtml = "";
  objHtml += "<hr>";
  objHtml += "<div class='container'><div class='row'> <div style='float:left; width:33%'>";

  if (boton1.length>0)
      {objHtml += "<img class='img-responsive' align='right' height='54%' width='54%' src="+boton1 +" alt='Atrás'";
          if (pantalla == 5) {objHtml += "onClick='javascript: irMenuKaraoke()'</div>";}
          else {objHtml += "onClick='javascript: Controlador.prototype.irSubMenu()'</div>";}
      }
    else {objHtml += "<img class='img-responsive' height='54%' width='54%' src='img/icons/botonBlanco.png'>";}
    objHtml += "</div><div style= 'float:center; display:inline-block; width:33%' align='center'><img class='img-responsive' height='54%' width='54%' src="+boton2 +" alt='Inicio' onClick='javascript:volverInicio()'></div><div style='float:right; width:33%'>";
    if (boton3.length>0){objHtml += "<img class='img-responsive' id='botonDerecho' height='54%' width='54%' src="+boton3 +" alt='Inicio'></div></div></div>"}
      else {objHtml += "<img class='img-responsive' height='54%' width='54%' src='img/icons/botonBlanco.png'></div></div></div>";}
    $(pie).html(objHtml);


  $("#contenedor").append(pie);
};

Vista.prototype.vEncabezado = function(imagen1,texto,imagen2) {
  mensaje = texto;

  // logoDerecha=imagen2;
  console.log("Logo de la derecha= "+imagen2);
  console.log("Logo del centro= "+texto);
  console.log("Logo de la iquierda= "+imagen1);
  cabeza = $("<div></div>");
  $(cabeza).attr("id","encabezado");
  $(cabeza).attr("class","header");
  $(cabeza).attr("style","width:100%; height:11%");
  var tabla = "<div class='container'><br><div class='row'> <div style='float:left; width:27%; align=center'>";

  if (imagen1.length>0){ if (pantalla !== 7 ) {tabla += "<img border=0 style='margin-left:30px; margin-top:-8px' width=90% height=90% src="+imagen1+">";}
    else {tabla += "<img border=0 class='llaveDerecha' src="+imagen1+">";}}
    else {tabla += "<img height='64' width='64' src='img/icons/botonBlanco.png'>";}
    tabla += "</div>"
    if (pantalla==7) {
      tabla += "<div style= 'float:center; display:inline; width:40%'><h5>"+mensaje+"</h5></div><div style= 'float:right; width:30%' align='center'>";
    } else {
      tabla += "<div style= 'float:center; display:inline; width:40%'><h1>"+mensaje+"</h1></div><div style= 'float:right; width:30%' align='center'>";
    }
    if (imagen2.length>0){tabla += "<img id='icoDerecha' border=0 width=30% margin-top=2px height=30% src="+imagen2+"></div></div></div>";}
           console.log(tabla);
      $(cabeza).html(tabla);

  $("#contenedor").append(cabeza);
  $("#contenedor").append("<hr>");
};


function volverInicio() {
    ejercicio=0;
  pantalla = 1;
  Controlador.prototype.cEliminarPantalla();
  Controlador.prototype.cMenu();
}

function irMenuKaraoke() {
  pantalla = 3;
  Controlador.prototype.cEliminarPantalla();
  console.log("Llegué al menu del karaoke...");
  Controlador.prototype.cMenuKaraoke();
}

function irActividad() {
  var completo="false";
  localStorage.setItem("nivelCompleto", JSON.stringify(completo));
  pantalla = 7;
  Controlador.prototype.cEliminarPantalla();
  console.log("Llegué al menu actividades del nivel: "+Controlador.nivel);
  if (Controlador.nivel==0) {
    Controlador.prototype.actividadCompletar(1);
    nivelActual=1;
  }
  if (Controlador.nivel==2) {
    Controlador.prototype.actividadSeleccionar(2);
    nivelActual=2;
  }

  if (Controlador.nivel==4) {
      Controlador.prototype.cActividades(3);
      nivelActual=3;
  }

  if (Controlador.nivel==6) {
    Controlador.prototype.cActividades(4);
    nivelActual=4;
  }

  if (Controlador.nivel==8) {
    Controlador.prototype.actividadCompletar(5);
    nivelActual=5;
  }

  if (Controlador.nivel==10) {
    Controlador.prototype.actividadSeleccionar(6);
    nivelActual=6;
  }

  }

function validarRespuesta() {
  $("#btnRevisar").attr("src","img/icons/doneInactivo.png");
  $("#btnRevisar").attr("onClick","");
  switch (Controlador.nivel) {
    case 0:
        maxRespuestas = (Controlador.completar.length);
        respuestasAEvaluar=Controlador.completar;
        break;
      case 2:
          maxRespuestas = (Controlador.seleccionar.length);
          respuestasAEvaluar=Controlador.seleccionar;
        break;

        case 4:
        console.log("Evaluando ejercicio 3");

          break;

        case 8:
        maxRespuestas = (Controlador.completar.length);
        respuestasAEvaluar=Controlador.completar;
          break;
      case 10:
          maxRespuestas = (Controlador.seleccionar.length);
          respuestasAEvaluar=Controlador.seleccionar;
          break;
    default:

  }
for (var i = 0; i < maxRespuestas; i++) {
  yo=pasarAMinuscula(document.getElementById('respuesta'+i).value);
  if (yo.length>0) {
    objeto = $("#respuesta"+i);
    if (yo.trim()==respuestasAEvaluar[i].correcto)
    {console.log("Son iguales");
    objeto.val(yo);
    objeto.append("<span class='glyphicon glyphicon-ok'>");
    objeto.addClass("correcta");
    objeto.attr("disabled","disabled");

    buenas++;
    console.log("Correctas= "+buenas+"/"+maxRespuestas);
    if (buenas == maxRespuestas) {
      console.log("Todas buenas!!!!");
      cambiarNivel();
      $("#botonDerecho").attr("src","img/icons/llave-T.png");
      $("#botonDerecho").attr("class","logo1");
      $("#botonDerecho").addClass("mi-imagen");
      $("#botonDerecho").attr("onClick","javascript: volverInicio()");
    }
    }
 else
    {console.log("Son diferentes");
    objeto.addClass("error");
    objeto.val(yo);
      objeto.append("<span class='glyphicon glyphicon-remove'>")
    objeto.attr("disabled","disabled");

    }
    }
}
}

function cajasLlenas(i) {
  yo=document.getElementById('respuesta'+i).value;
  if (yo.length>0) {
    llenas++;
    $('#respuesta'+i).attr("onblur","");
  }
  objeto = $("#respuesta"+i);
  console.log("Entré, y llenas vale: "+llenas);
  switch (Controlador.nivel) {
    case 0:
        total = (Controlador.completar.length)-1;
      break;
      case 2:
          total = (Controlador.seleccionar.length)-1;
        break;
      case 8:
          total = (Controlador.completar.length)-1;
        break;

      case 10:
        total = (Controlador.seleccionar.length)-1;
      break;
  default:

  }
  console.log("Nivel actual: "+((Controlador.nivel/2)+1));
  if (llenas >= total) {
    console.log("Esta es la última");
      $("#btnRevisar").attr("src","img/icons/doneActivo.png");
      $("#btnRevisar").attr("onClick","validarRespuesta()");
      objeto.change(function(){
        console.log("Activar botón DONE");
    });
  }
}

function deshabilitar() {
  // Getter
  if (ejercicio==5) {
    $("#next").attr("style", "visibility: hidden");
  }
  var disabled = $( ".arrastrable" ).draggable( "option", "disabled" );
  $(".tarjetas").attr("onClick","");
  $(".tarjetas2").attr("onClick","");
  console.log(aciertos+"/"+totalEjercicios);
  if (Controlador.nivel==4) {
    totalEjercicios--;
  }
  if (aciertos==(totalEjercicios)) {
    console.log("Todas buenas");
    console.log("****nivel="+((Controlador.nivel/2)+1));
    cambiarNivel();
    $("#botonDerecho").attr("src","img/icons/llave-T.png");
    $("#botonDerecho").attr("class","logo1");
    $("#botonDerecho").addClass("mi-imagen");
    $("#botonDerecho").attr("onClick","javascript: volverInicio()");
    cambiarNivel();
  }

    // Setter
  $( ".arrastrable" ).draggable( "option", "disabled", true );
if (ejercicio<5) {

  $("#next").attr("src","img/icons/nextActivo.png");
  $("#next").attr("onClick","irActividad(Controlador.nivel)");
  console.log("Ejercicio #"+ejercicio);
  console.log("Aciertos: "+ aciertos);
  ejercicio++;
  if (document.getElementById('vacio').style.color == 'green') {
    aciertos++;

    }

  }
}

function play() {
    document.getElementById('audio1').play();
}


function animar(elemento,correcta,y) {
  console.log("correcta es: "+correcta);
  console.log("eliguió: "+elemento);

    $("#"+elemento).attr("class","desplazar"+y);

    if (elemento==correcta) {
      console.log("Esa sí es la correcta");
      document.getElementById('correct').play();
      aciertos++;
      document.getElementById(elemento).innerHTML = elemento.slice(3)+" <span class='glyphicon glyphicon-ok'> ";
      $("#"+elemento).attr("style","color:green");
      $("#tarjetas").attr("onClick","");
          $("#tarjetas2").attr("onClick","");
    } else {
      console.log("Esa no es la correcta");
      document.getElementById('wrong').play();
      document.getElementById(elemento).innerHTML = elemento.slice(3)+" <span class='glyphicon glyphicon-remove'> ";
      $("#"+elemento).attr("style","color:red");
      // $(".tarjetas").attr("onClick","");
    }
    deshabilitar()
  }

function cambiarNivel() {
   localStorage.setItem("ultimoNivel", nivelActual+1);
}

function resetear() {
  			$('#confirmacion').attr("style","visibility:visible"); //muestro mediante id
}

function salir() {
  $('#confirmacion').attr("style","visibility:hidden");
  $("#myModal").attr("style","display:none");
}

function salirYResetear() {
  localStorage.clear();
  $('#confirmacion').attr("style","visibility:hidden");
  $("#myModal").attr("style","display:none");
  Vista();
  Controlador.prototype.irMenu();
  $("#nivel1").attr("class","botones-menu");
  }
