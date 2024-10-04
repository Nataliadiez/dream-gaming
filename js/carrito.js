

const cambiarCantidad = (monto) => {
    const input = document.getElementById("cantidadProducto");
    let valorActual = parseInt(input.value);

    let nuevoValor = valorActual + monto;
    if(nuevoValor >= 1){
        input.value = nuevoValor;
    } 

}