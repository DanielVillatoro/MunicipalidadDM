var idPropietarioGLobal = null;
var GlobalDatatablePropiedades = 0;
var GlobalTablePropiedades = null;
$("#fondoBody").removeAttr('style');
$(document).ready(function () {
    $('#tbl_propiedad').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "bSort": false,
        dom: 'Bfrtip',
    });
});

function getDatosCliente(id, nombre) {
    idPropietarioGLobal = id;
    $("#tbodyPropiedades").empty();
    document.getElementById("consultaButton").click();
    $("#numCodigo").text('Id: ' + id);
    $("#nombreCliente").text('Num Finca: ' + nombre);
    if (GlobalDatatablePropiedades == 1) {
        GlobalTablePropiedades.destroy();
    }
    $.ajax({//CONSULTA AJAX QUE TRAE LAS PROPIEDADES, parametro: ID DEL CLIENTE.
        url: "../../PropiedadVsConceptoCobro/GetConceptos",
        type: "POST",
        dataType: "json",
        data: { IdCC: id },
        success: function (result) {
            var registros = result;
            var html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["id"] + "</td>";
                html += "<td>" + registros[i]["nombre"] + "</td>";
                html += "<td>" + registros[i]["diaCobro"] + "</td>";
                html += "<td>" + registros[i]["diasVencimiento"] + "</td>";
                html += "<td>" + registros[i]["esImpuesto"] + "</td>";
                html += "<td>" + registros[i]["esRecurrente"] + "</td>";
                html += "<td>" + registros[i]["esFijo"] + "</td>";
                html += "<td>" + registros[i]["tasaInteresMoratorio"] + "</td>";
                html += "<td><center><a id='" + registros[i]["id"] + "' class='btn btn-danger' onclick='deleteRelacion(this.id); return false;'><span class='fas fa-trash' aria-hidden='true'></span></a></center></td>";
            };
            $("#tbodyPropiedades").html(html);
            GlobalTablePropiedades = $('#tbl_propiedades').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                },
                "bSort": false,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5'
                ]
            });
            GlobalDatatablePropiedades = 1;
        }
    });
}

function addRelacion(idPropiedad) {
    $.ajax({
        url: "../../PropiedadVsConceptoCobro/AddRelacion",
        type: "POST",
        dataType: "json",
        data: { IdPropietario: idPropietarioGLobal, IdPropiedad: idPropiedad },
        success: function (result) {
            alertify.success('Relacion agregada correctamente');
            location.reload();
        }
    });
}

function deleteRelacion(idPropiedad) {
    $.ajax({
        url: "../../PropiedadVsConceptoCobro/DeleteRelacion",
        type: "POST",
        dataType: "json",
        data: { IdPropietario: idPropietarioGLobal, IdPropiedad: idPropiedad },
        success: function (result) {
            alertify.success('Relacion eliminada correctamente');
            location.reload();
        }
    });
}

function GetPropiedades() {
    $.ajax({//CONSULTA AJAX QUE TRAE LAS PROPIEDADES, parametro: ID DEL CLIENTE.
        url: "../../PropiedadVsConceptoCobro/GetAllConceptos",
        type: "POST",
        dataType: "json",
        success: function (result) {
            var registros = result; 
            html = "";
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["id"] + "</td>";
                html += "<td>" + registros[i]["nombre"] + "</td>";
                html += "<td>" + registros[i]["diaCobro"] + "</td>";
                html += "<td>" + registros[i]["diasVencimiento"] + "</td>";
                html += "<td>" + registros[i]["esImpuesto"] + "</td>";
                html += "<td>" + registros[i]["esRecurrente"] + "</td>";
                html += "<td>" + registros[i]["esFijo"] + "</td>";
                html += "<td>" + registros[i]["tasaInteresMoratorio"] + "</td>";
                html += "<td><center><a id='" + registros[i]["id"] + "' class='btn btn-primary' onclick='addRelacion(this.id); return false;'><span class='fas fa-check' aria-hidden='true'></span></a></center></td>";
            };
            $("#tbody_allCC").html(html);
            $('#tbl_AllCC').DataTable({
                destroy: true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                },
                "bSort": false,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5'
                ]
            });
            $('#myModal').modal('show');
        }
    });
}