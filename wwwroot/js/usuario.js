$("#fondoBody").removeAttr('style');
var GLOBALID = null;
var globalAccion = null;
var nombresUsuarios = null;
function addUsuario() {
    Usuario = $("#Usuario").val();
    Contrasena = $("#Contrasena").val();
    if (Usuario != "" && Contrasena != "") {
        Rol = $("#tipoRol").val();
        $.ajax({
            url: "../../Usuario/AddUser",
            type: "POST",
            dataType: "json",
            data: { Usuario: Usuario, Contrasena: Contrasena, Rol: Rol },
            success: function (respuesta) {
                $('#addUsuario').modal('hide');
                alertify.success('Usuario guardado correctamente');
                location.reload();
            }
        })
    }
    else {
        alertify.error('Error.Todos los datos deben ser ingresados');
    }
}

function editUser() {
    Usuario = $("#Usuario").val();
    Contrasena = $("#Contrasena").val();
    Rol = $("#tipoRol").val();
    $.ajax({
        url: "../../Usuario/EditUser",
        type: "POST",
        dataType: "json",
        data: { Id: GLOBALID, Usuario: Usuario, Contrasena: Contrasena, Rol: Rol },
        success: function () {
            $('#addUsuario').modal('hide');
            alertify.success('Usuario actualizado correctamente');
            location.reload();
        }
    })
}

function deleteUser(idUsuario) {
    $.ajax({
        url: "../../Usuario/DeleteUser",
        type: "POST",
        dataType: "json",
        data: { Id: idUsuario },
        success: function (respuesta) {
            alertify.success('Usuario actualizado correctamente');
            location.reload();
        }
    })
}

$(document).ready(function () {
    $('#tbl_usuario').DataTable({
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
        addUsuario();
    }
    else {
        editUser();
    }
}

function getDatosCliente(id, nombre, pass) {
    GLOBALID = id;
    globalAccion = "edit";
    $("#Usuario").val(nombre)// = "";
    $("#Contrasena").val(pass)//="";
    $('#addUsuario').modal('show');
}

function limpiaModal() {
    globalAccion = "ADD";
    $("#Usuario").val("")// = "";
    $("#Contrasena").val("")//="";
    $('#addUsuario').modal('show');
}