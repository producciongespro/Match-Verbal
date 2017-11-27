var estado=0, c, espera=2000;
$(document).ready(function () {
  c = new Controlador("data/contenidos.json");
  main();
});

function main(pantalla) {
  console.log("Estado: " + estado);
  switch (estado) {
    case 0:
      c.cPortada("img/splash.jpg",2000);
      estado=1;
      setTimeout(main, espera);
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
