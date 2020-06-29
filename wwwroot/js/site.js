// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var data;

function viewLoad() {
    getAgencias();
}
//trae todos los datos de las agencias
function getAgencias() {
    $.ajax({
        url: "../../Agencia/GetAgencia",
        type: "POST",
        dataType: "json",
        data: { id: 1 },
        success: function (respuesta) {
            data = respuesta;
            $("#tbody").html("");

            for (var i = 0; i < respuesta.length; i++) {
                if (respuesta[i].estado == 1) {
                    var tr = `<tr>
                              <td>`+ respuesta[i].id + `</td>
                              <td>`+ respuesta[i].nombre + `</td>
                              <td>`+ respuesta[i].empresa + `</td>
                              <td>
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-success btn-activo" id="btnActivo">Activa</button>
                              </td>
                              <td>
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-edit"><i class="fas fa-edit"></i></i></button>
                              </td>
                          </tr>`;
                    $("#tbody").append(tr)
                } else {
                    var tr = `<tr>
                              <td>`+ respuesta[i].id + `</td>
                              <td>`+ respuesta[i].nombre + `</td>
                              <td>`+ respuesta[i].empresa + `</td>
                              <td>
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-danger btn-inactivo" id="btnInactivo">Inactiva</button>
                              </td>
                              <td>
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-edit"><i class="fas fa-edit"></i></i></button>
                              </td>
                          </tr>`;
                    $("#tbody").append(tr)
                }
            }
        },
        error: function (errormessage) {
            alertify.alert("Error",errormessage.responseText);
        }
    })
}

$(document).on('click', '.btn-edit', function (e) {
    
    $('#idAgencia').css('border-color', 'lightgrey');
    $('#Nombre').css('border-color', 'lightgrey');
    $("#companias").attr('selected', false);
    $("#companias option").each(function () {
        // Marcamos cada valor como seleccionado
        $("#companias option[value=" + this.value + "]").prop("selected", false);
    });
    e.preventDefault();
    
    for (var i = 0; i < data.length; i++) {
        
        var idAgencia = $(this).parent().parent().children().first().text();
        if (data[i].id == idAgencia) {
            $("#id").val(data[i].id);
            $("#Nombre").val(data[i].nombre);
            $("#companias option:contains(" + data[i].empresa + ")").attr('selected', true);
        }
    }
    $('#addAgencia').modal('show');
    $('#btnUpdate').show();
    $('#btnAdd').hide();
});
//Guarda los datos de la agencia
function SaveAgencia() {
    var res = validate();
    if (res == false) {
        return false;
    } else {
        var Datos = {
            'Nombre': $("#Nombre").val(),
            'estado': 1,
            'companias': $('#companias').val(), 
        };
        var Usuario = JSON.stringify(Datos);

        $.ajax({
            url: "../../Agencia/SaveAgencia",
            type: "POST",
            dataType: "json",
            data: { Datos: Usuario },
            success: function (respuesta) {
                if (respuesta == 1) {

                    $('#addAgencia').modal('hide');

                    alertify.success('Registro guardado correctamente', 3);

                    getAgencias();

                } else {

                    $('#addAgencia').modal('hide');
                    alertify.alert('ERROR', 'Error al guardar');
                }
            }

        });
    }
}
//actualiza los datos de la agencia
function UpdateAgencia() {
    var res = validate();
    if (res == false) {
        return false;
    } else {
        var Datos = {
            'id': $("#id").val(),
            'Nombre': $("#Nombre").val(),
            'estado': data[0].estado,
            'companias': $('#companias').val(),
        };
        var Usuario = JSON.stringify(Datos);
        alert(Usuario);
        $.ajax({
            url: "../../Agencia/UpdateAgencia",
            type: "POST",
            dataType: "json",
            data: { Datos: Usuario },
            success: function (respuesta) {
                if (respuesta == 1) {

                    $('#addAgencia').modal('hide');

                    alertify.success('Registro guardado correctamente', 3);

                    getAgencias();

                } else {
                    $('#addAgencia').modal('hide');
                    alertify.alert('ERROR', 'Error al guardar');
                }
            }
        });
    }
}
//valida los campos del modal
function validate() {
    var isValid = true;
    if ($('#Nombre').val().trim() == "") {
        $('#Nombre').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nombre').css('border-color', 'lightgrey');
    }
    return isValid;
}
//limpia los campos del modal
function clearTextBox() {
    $("#id").val("");
    $('#Nombre').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nombre').css('border-color', 'lightgrey');
}
//cambia el estado del boton activo
$(document).on('click', '.btn-activo', function (e) {
    for (var i = 0; i < data.length; i++) {
        var idAgencia = $(this).parent().parent().children().first().text();
        if (data[i].id == idAgencia) {
            alertify.confirm('', '¿Desactivar agencia?', function () {
                UpdateEstadoAgencia(0, idAgencia);
                alertify.error("Agencia desactivada")
            }, function () { alertify.error('Cancelar') });
        }
    }
});
//cambia el estado del boton inactivo
$(document).on('click', '.btn-inactivo', function (e) {
    for (var i = 0; i < data.length; i++) {
        var idAgencia = $(this).parent().parent().children().first().text();
        if (data[i].id == idAgencia) {
            alertify.confirm('', '¿Activar agencia?', function () {
                UpdateEstadoAgencia(1, idAgencia);
                alertify.success("Agencia Activada")
            }, function () { alertify.error('Cancelar') });
        }
    }
});
//actualiza el estado de la agencia
function UpdateEstadoAgencia(state, datos) {
    var Datos = {
        'id': datos,
        'Nombre': $("#Nombre").val(),
        'estado': state,
    };
    var Agencia = JSON.stringify(Datos);
    $.ajax({
        url: "../../Agencia/UpdateEstadoAgencia",
        type: "POST",
        dataType: "json",
        data: { Datos: Agencia },
        success: function (result) {
            if (result == 1) {
                getAgencias();
            } else {
                alertify.alert('ERROR', 'Error al activar');
            }
        }
    });
}


$(document).ready(function () {
    $('#tbl_agencia').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
        ],
        paging: true
    });
});