function estatus(id, tipo) {
    $.ajax({
        url: "../../Cliente/UpdateEstadoCliente",
        type: "POST",
        dataType: "json",
        data: { Id: id, Tipo: tipo }
    });
    if (tipo == 1) {
        alertify.success('Cliente activado correctamente');
        document.getElementById("btnEstado," + id).className += " btn-success";
        document.getElementById("btnEstado," + id).className = document.getElementById("btnEstado," + id).className.replace(/(?:^|\s)btn-danger(?!\S)/g, '');
        var accion = "estatus(" + id + ",0 );"
        document.getElementById("btnEstado," + id).setAttribute("onClick", accion);
        document.getElementById("btnEstado," + id).innerText = 'Activo';
    }
    else {
        alertify.success('Usuario desactivado correctamente');
        document.getElementById("btnEstado," + id).className += " btn-danger";
        document.getElementById("btnEstado," + id).className = document.getElementById("btnEstado," + id).className.replace(/(?:^|\s)btn-success(?!\S)/g, '');
        var accion = "estatus("+id+",1 );"
        document.getElementById("btnEstado," + id).setAttribute("onClick", accion);
        document.getElementById("btnEstado," + id).innerText = 'Inactivo';
    }
}


function saveLimite(id) {
    var inputLimite = "Limite," + id;
    var limite = document.getElementById(inputLimite).value;
    var inputPlazo = "Plazo," + id;
    var plazo = document.getElementById(inputPlazo).value;
    $.ajax({
        url: "../../Cliente/UpdateDatos",
        type: "POST",
        dataType: "json",
        data: { Id: id, Limite: limite, Plazo: plazo }
    });
    alertify.success('Datos guardados correctamente');
}