$("#fondoBody").removeAttr('style');
var GLOBALID = null;
var globalAccion = null;
function addPropiedad() {
    var num = $("#NumFinca").val();
    var direccion = $("#Direccion").val();
    var valor = $("#Valor").val();
    $.ajax({
        url: "../../Propiedad/AddPropiedad",
        type: "POST",
        dataType: "json",
        data: { NumFinca: num, Direccion: direccion, Valor: valor },
        success: function (respuesta) {
            $('#addPropiedad').modal('hide');
            alertify.success('Propiedad guardada correctamente');
            location.reload();
        }
    })
}

function editPropiedad() {
    var num=$("#NumFinca").val();
    var direccion=$("#Direccion").val();
    var valor=$("#Valor").val();
    $.ajax({
        url: "../../Propiedad/EditPropiedad",
        type: "POST",
        dataType: "json",
        data: { Id: GLOBALID, NumFinca: num, Direccion: direccion, Valor: valor },
        success: function () {
            $('#addPropiedad').modal('hide');
            alertify.success('Propiedad actualizada correctamente');
            location.reload();
        }
    })
}

function deletePropiedad(id) {
    $.ajax({
        url: "../../Propiedad/DeletePropiedad",
        type: "POST",
        dataType: "json",
        data: { Id: id },
        success: function (respuesta) {
            alertify.success('Propiedad actualizado correctamente');
            location.reload();
        }
    })
}

$(document).ready(function () {
    $('#tbl_propiedad').DataTable({
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
        addPropiedad();
    }
    else {
        editPropiedad();
    }
}

function getDatosPropiedad(id, numFinca, direccion,valor) {
    GLOBALID = id;
    globalAccion = "edit";
    $("#NumFinca").val(numFinca)// = "";
    $("#Direccion").val(direccion)//="";
    $("#Valor").val(valor)//="";
    $('#addPropiedad').modal('show');
}

function limpiaModal() {
    globalAccion = "ADD";
    $("#NumFinca").val("")// = "";
    $("#Direccion").val("")//="";
    $("#Valor").val("")//="";
    $('#addPropiedad').modal('show');
}