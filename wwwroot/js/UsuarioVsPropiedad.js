var idPropietarioGLobal = null;
var GlobalDatatablePropiedades = 0;
var GlobalTablePropiedades = null;
$("#fondoBody").removeAttr('style');
$(document).ready(function () {
    $('#tbl_propietario').DataTable({
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
    $("#nombreCliente").text('Usuario: ' + nombre);
    if (GlobalDatatablePropiedades == 1) {
        GlobalTablePropiedades.destroy();
    }
    $.ajax({//CONSULTA AJAX QUE TRAE LAS PROPIEDADES, parametro: ID DEL CLIENTE.
        url: "../../PropiedadUsuario/GetPropiedades",
        type: "POST",
        dataType: "json",
        data: { IdCliente: id },
        success: function (result) {
            var registros = result;
            var html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["id"] + "</td>";
                html += "<td>" + registros[i]["numFinca"] + "</td>";
                html += "<td>" + registros[i]["valor"] + "</td>";
                html += "<td>" + registros[i]["direccion"] + "</td>";
                html += "<td><center><a id='" + registros[i]["id"] + "' class='btn btn-danger' onclick='deletePropiedad(this.id); return false;'><span class='fas fa-trash' aria-hidden='true'></span></a></center></td>";
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
        url: "../../UsuarioVsPropiedad/AddRelacion",
        type: "POST",
        dataType: "json",
        data: { IdPropietario: idPropietarioGLobal, IdPropiedad: idPropiedad },
        success: function (result) {
            alertify.success('Relacion agregada correctamente');
            location.reload();
        }
    });
}

function deletePropiedad(idPropiedad) {
    $.ajax({
        url: "../../UsuarioVsPropiedad/DeleteRelacion",
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
        url: "../../PropietarioVsPropiedad/GetPropiedades",
        type: "POST",
        dataType: "json",
        success: function (result) {
            var registros = result;
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["id"] + "</td>";
                html += "<td>" + registros[i]["numFinca"] + "</td>";
                html += "<td>" + registros[i]["valor"] + "</td>";
                html += "<td>" + registros[i]["direccion"] + "</td>";
                html += "<td><center><a id='" + registros[i]["id"] + "' class='btn btn-primary' onclick='addRelacion(this.id); return false;'><span class='fas fa-check' aria-hidden='true'></span></a></center></td>";
            };
            $("#tbody_allProp").html(html);
            $('#tbl_Allpropiedades').DataTable({
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