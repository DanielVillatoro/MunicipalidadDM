$("#fondoBody").removeAttr('style');
var GLOBALID = null;
var globalAccion = null;
function addPropietario() {
    var nombre = $("#Nombre").val();
    var NumDoc = $("#NumDoc").val();
    var TipoDoc = $("#TipoDoc").val();
    $.ajax({
        url: "../../Propietario/AddPropietario",
        type: "POST",
        dataType: "json",
        data: { Nombre: nombre, NumDoc: NumDoc, TipoDoc: TipoDoc },
        success: function (respuesta) {
            $('#addPropietario').modal('hide');
            alertify.success('Propietario guardada correctamente');
            location.reload();
        }
    })
}

function editPropietario() {
    var nombre = $("#Nombre").val();
    var NumDoc = $("#NumDoc").val();
    var TipoDoc = $("#TipoDoc").val();
    $.ajax({
        url: "../../Propietario/EditPropietario",
        type: "POST",
        dataType: "json",
        data: { Id: GLOBALID, Nombre: nombre, NumDoc: NumDoc, TipoDoc: TipoDoc},
        success: function () {
            $('#addPropietario').modal('hide');
            alertify.success('Propietario actualizada correctamente');
            location.reload();
        }
    })
}

function deletePropietario(id) {
    $.ajax({
        url: "../../Propietario/DeletePropietario",
        type: "POST",
        dataType: "json",
        data: { Id: id },
        success: function (respuesta) {
            alertify.success('Propietario actualizado correctamente');
            location.reload();
        }
    })
}

$(document).ready(function () {
    $('#tbl_propietario').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "bSort": false,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5', 'pdfHtml5', 'csvHtml5'
        ]
    });
});

function determinaAccion() {
    if (globalAccion == "ADD") {
        addPropietario();
    }
    else {
        editPropietario();
    }
}

function getDatosPropietario(id, nombre, numdoc) {
    GLOBALID = id;
    globalAccion = "edit";
    $("#Nombre").val(nombre);
    $("#NumDoc").val(numdoc);
    obtieneDocumentos();
    $('#addPropietario').modal('show');
}

function limpiaModal() {
    globalAccion = "ADD";
    $("#Nombre").val("");
    $("#NumDoc").val("");
    obtieneDocumentos();
    $('#addPropietario').modal('show');
}

function obtieneDocumentos() {
    $.ajax({
        url: "../../Propietario/GetDocs",
        type: "POST",
        dataType: "json",
        success: function (respuesta) {
            var html = "";
            for (var i = 0; i < respuesta.length; i++) {
                html += "<option value='" + respuesta[i]["id"] + "'>" + respuesta[i]["nombre"]+"</option>"
            };
            $("#TipoDoc").html(html);
        }
    })
}