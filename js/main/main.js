var estado=0, c, audio, espera=2000;

$(document).ready(function () {
  c = new Controlador("data/contenidos.json");
    // createAudio();
  main();
});

function main(pantalla) {
  console.log("Estado: " + estado);
  switch (estado) {
    case 0:

      c.cPortada("img/splash.jpg",3000);
      estado=1;
      setTimeout(main, espera);
      audio = new Audio();
      audio.src="audios/intro.mp3";
      console.log("No puedo sonar el audio");
      audio.play();
      break;
    case 1:
      c.cEliminarPantalla();
      c.cMenu();
      break;
    case 2:
      c.cEliminarPantalla();
      c.cSubMenu();
      break;
    case 3:
      c.cEliminarPantalla();
      c.cDetalleVerbo();
      break;
    default:
  }
}
