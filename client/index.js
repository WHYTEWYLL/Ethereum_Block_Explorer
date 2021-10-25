import "./index.scss";

const server = "http://localhost:3042";

document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

  fetch(`${server}/block/${value}`).then((response) => {
    return response.json();
  }).then(( data ) => {
    console.log(data)
    
    document.getElementById("balance").innerHTML = genera_tabla(data);
  });
});



function genera_tabla(data) {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];
  let preTable = document.querySelector("table")
  if(preTable){
    preTable.parentNode.removeChild(preTable);
  }
    // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // Crea las celdas
  for (let i = 0; i < Object.keys(data).length  ; i++) {
    // Crea las hileras de la tabla
    let hilera = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      if(j==0){
        var textoCelda = document.createTextNode(Object.keys(data)[i]);

      }else{
        var textoCelda = document.createTextNode(Object.values(data)[i]);

      }

      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
}
