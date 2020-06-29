var data;

function viewLoadComp() {
    getCompanias();
}
//Funcion para obtener todas las compañias y mostrar en tabla
function getCompanias() {
    $('#tbl_compania').DataTable({
        "scrollX": true
    });
    $.ajax({
        url: "../../Compania/GetComp",
        type: "POST",
        dataType: "json",
        data: { id: 1 },
        success: function (result) {
            data = result;
            $("#tbodyComp").html("");
            for (var i = 0; i < result.length; i++) {
                if (result[i].activa == 1) {
                    var tr = `<tr>
                              <td>`+ result[i].id + `</td>
                              <td>`+ result[i].empresa + `</td>
                              <td>`+ result[i].cedula + `</td>
                              <td>`+ result[i].oficina + `</td>
                              <td>`+ result[i].email + `</td>
                              <td>`+ result[i].telefono + `</td>
                              <td>`+ result[i].mensaje + `</td>
                              <td>`+ result[i].impresora + `</td>
                              <td>`+ result[i].copias + `</td>
                              <td>`+ result[i].digitos_ean + `</td>
                              <td>
                               
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-success btn-activo" id="btnActivo">Activo</button>
                              </td>
                              <td>
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-edit">Editar</button>
                              </td>
                          </tr>`;
                } else {
                    var tr = `<tr>
                              <td>`+ result[i].id + `</td>
                              <td>`+ result[i].empresa + `</td>
                              <td>`+ result[i].cedula + `</td>
                              <td>`+ result[i].oficina + `</td>
                              <td>`+ result[i].email + `</td>
                              <td>`+ result[i].telefono + `</td>
                              <td>`+ result[i].mensaje + `</td>
                              <td>`+ result[i].impresora + `</td>
                              <td>`+ result[i].copias + `</td>
                              <td>`+ result[i].digitos_ean + `</td>
                              <td>
                               
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-danger btn-inactivo" id="btnActivo">Inactivo</button>
                              </td>
                              <td>
                                  <button value="Actualizar" title="Actualizar" class="btn btn-primary btn-edit">Editar</button>
                              </td>
                          </tr>`;
                }
                $("#tbodyComp").append(tr)
            }
        }
    });
}

//al dar click en actualizar rellena campos en modal
$(document).on('click', '.btn-edit', function (e) {
    e.preventDefault();
    for (var i = 0; i < data.length; i++) {
        var idCompania = $(this).parent().parent().children().first().text();
        if (data[i].id == idCompania) {
            $("#id").val(data[i].id);
            $("#empresa").val(data[i].empresa);
            $("#cedula").val(data[i].cedula);
            $("#oficina").val(data[i].oficina);
            $("#email").val(data[i].email);
            $("#telefono").val(data[i].telefono);
            $("#mensaje").val(data[i].mensaje);
            $("#impresora").val(data[i].impresora);
            $("#copias").val(data[i].copias);
            $("#digitos_ean").val(data[i].digitos_ean);
        }
    }
    $('#addCompania').modal('show');
    $('#btnUpdate').show();
    $('#btnAdd').hide();
});

//funcion para guardar datos de compañia
function saveCompania() {
    
    if (validateComp()) {
        var Datos = {
            'empresa': $("#empresa").val(),
            'cedula': $("#cedula").val(),
            'oficina': $("#oficina").val(),
            'email': $("#email").val(),
            'telefono': $("#telefono").val(),
            'mensaje': $("#mensaje").val(),
            'impresora': $("#impresora").val(),
            'copias': $("#copias").val(),
            'digitos_ean': $("#digitos_ean").val(),
            'activa': 1,
        };
        var Compania = JSON.stringify(Datos);
        alert(Compania);
        $.ajax({
            url: "../../Compania/InsertComp",
            type: "POST",
            dataType: "json",
            data: { Datos: Compania },
            success: function (result) {
                if (result == 1) {
                    alert($("email").val());
                    $('#addCompania').modal('hide');
                    alertify.success('Registro guardado correctamente', 3);
                    getCompanias();
                } else {
                    $('#addCompania').modal('hide');
                    alertify.alert('ERROR', 'Error al guardar');
                }
            }

        });
    }
}
//funcion para guardar datos de compañia
function UpdateCompania() {
    if (validateComp()) {
        var Datos = {
            'id': $("#id").val(),
            'empresa': $("#empresa").val(),
            'cedula': $("#cedula").val(),
            'oficina': $("#oficina").val(),
            'email': $("#email").val(),
            'telefono': $("#telefono").val(),
            'mensaje': $("#mensaje").val(),
            'impresora': $("#impresora").val(),
            'copias': $("#copias").val(),
            'digitos_ean': $("#digitos_ean").val(),
            'activa': data[0].activa,
        }
        var Compania = JSON.stringify(Datos);
        alert(Compania);
        $.ajax({
            url: "../../Compania/UpdateComp",
            type: "POST",
            dataType: "json",
            data: { Datos: Compania },
            success: function (result) {
                if (result == 1) {
                    $('#addCompania').modal('hide');
                    alertify.success('Registro guardado con existo', 3);
                    getCompanias();
                } else {
                    $('#addCompania').modal('hide');
                    alertify.alert('ERROR', 'Error al guardar');
                }
            }
        });
    }
}
//funcion para validar los campos del modal
function validateComp() {
    var isValid = true;
    if ($('#empresa').val().trim() == "") {
        $('#empresa').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#empresa').css('border-color', 'lightgrey');
    }
    if ($('#cedula').val().trim() == "") {
        $('#cedula').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#cedula').css('border-color', 'lightgrey');
    }
    if ($('#oficina').val().trim() == "") {
        $('#oficina').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#oficina').css('border-color', 'lightgrey');
    }
    if ($('#email').val().trim() == "") {
        $('#email').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#email').css('border-color', 'lightgrey');
    }
    if ($('#telefono').val().trim() == "") {
        $('#telefono').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#telefono').css('border-color', 'lightgrey');
    }
    if ($('#mensaje').val().trim() == "") {
        $('#mensaje').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#mensaje').css('border-color', 'lightgrey');
    }
    if ($('#impresora').val().trim() == "") {
        $('#impresora').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#impresora').css('border-color', 'lightgrey');
    }
    if ($('#copias').val().trim() == "") {
        $('#copias').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#copias').css('border-color', 'lightgrey');
    }
    if ($('#digitos_ean').val().trim() == "") {
        $('#digitos_ean').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#digitos_ean').css('border-color', 'lightgrey');
    }
    return isValid;
}
//funcion para limpiar los campos del modal
function clearTextBox() {
    $("#id").val("");
    $("#empresa").val("");
    $("#cedula").val("");
    $("#oficina").val("");
    $("#email").val("");
    $("#telefono").val("");
    $("#mensaje").val("");
    $("#impresora").val("");
    $("#copias").val("");
    $("#digitos_ean").val("");
    $('#empresa').css('border-color', 'lightgrey');
    $('#cedula').css('border-color', 'lightgrey');
    $('#oficina').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#telefono').css('border-color', 'lightgrey');
    $('#mensaje').css('border-color', 'lightgrey');
    $('#impresora').css('border-color', 'lightgrey');
    $('#copias').css('border-color', 'lightgrey');
    $('#digitos_ean').css('border-color', 'lightgrey');
    $('#btnUpdate').hide();
    $('#btnAdd').show();
}
//al dar click cambia el estado del boton
$(document).on('click', '.btn-activo', function (e) {
    for (var i = 0; i < data.length; i++) {
        var idCompania = $(this).parent().parent().children().first().text();
        if (data[i].id == idCompania) {
            alertify.confirm('', '¿Desactivar compañia?', function () {
                UpdateEstadoCompania(0, idCompania);
                alertify.error("Compañia desactivada")
            }, function () { alertify.error('Cancelar') });
        }
    }
});

$(document).on('click', '.btn-inactivo', function (e) {
    for (var i = 0; i < data.length; i++) {
        var idCompania = $(this).parent().parent().children().first().text();
        if (data[i].id == idCompania) {
            alertify.confirm('', '¿Activar compañia?', function () {
                UpdateEstadoCompania(1, idCompania);
                alertify.success("Compañia Activada")
            }, function () { });
        }
    }
});
//funcion para actualizar el estado de la compañia
function UpdateEstadoCompania(state, datos) {
    var Datos = {
        'id': datos,
        'empresa': $("#empresa").val(),
        'cedula': $("#cedula").val(),
        'oficina': $("#oficina").val(),
        'email': $("#email").val(),
        'telefono': $("#telefono").val(),
        'mensaje': $("#mensaje").val(),
        'impresora': $("#impresora").val(),
        'copias': 1,
        'digitos_ean': 1,
        'activa': state,
    }
    var Compania = JSON.stringify(Datos);
    $.ajax({
        url: "../../Compania/UpdateEstadoComp",
        type: "POST",
        dataType: "json",
        data: { Datos : Compania },
        success: function (result) {
            if (result == 1) {
                getCompanias();
            } else {
                alertify.alert('ERROR', 'Error al activar');
            }
        }
    });
}

$(document).ready(function () {
    $('#tbl_compania').DataTable({
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