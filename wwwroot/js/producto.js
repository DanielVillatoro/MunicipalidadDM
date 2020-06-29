function savePrecio(id) {
    var input = "Producto," + id;
    var precio = document.getElementById(input).value;
    $.ajax({
        url: "../../Producto/UpdateProducto",
        type: "POST",
        dataType: "json",
        data: { Id: id, Precio: precio }
    });
    alertify.success('Precio guardado correctamente');
}