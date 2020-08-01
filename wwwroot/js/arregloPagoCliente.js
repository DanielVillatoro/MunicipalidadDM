var GlobalIdProp = null;
var GlobalNumFinca = null;
$("#fondoBody").removeAttr('style');
function getAP(id,nombre) {
    document.getElementById("consultaButton").click();
    GlobalIdProp=id;
    GlobalNumFinca=nombre;
    $("#nombreCliente").text('Num Finca: ' + nombre);
    $.ajax({
        url: "../../ArregloPagoCliente/GetAP",
        type: "POST",
        dataType: "json",
        data: { idPropiedad: id },
        success: function (result) {
            var registros = result;
            var estado = null;
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["montoOriginal"] + "</td>";
                html += "<td>" + registros[i]["saldo"] + "</td>";
                html += "<td>" + registros[i]["tasaInteresAnual"] + "</td>";
                html += "<td>" + registros[i]["plazoOriginal"] + "</td>";
                html += "<td>" + registros[i]["plazoResta"] + "</td>";
                html += "<td>" + registros[i]["cuota"] + "</td>";
                html += "<td>" + registros[i]["insertedAt"] + "</td>";
                html += "<td>" + registros[i]["updatedAt"] + "</td>";
                estado = "<center><a id='" + registros[i]["id"] + "' class='btn btn-primary border-0 rounded-0 p-0;' onclick='verMovimiento(this.id); return false;'><i class='fa fa-play' aria-hidden='true'></i><span>Ver Movimientos</span></a></center>";
                html += "<td>" + estado + "</td>";
                html += "</tr>";
            };
            $("#tbodyAP").html(html);
        }
    });
}

function verMovimiento(id) {
    $.ajax({
        url: "../../ArregloPagoCliente/GetMov",
        type: "POST",
        dataType: "json",
        data: { idAP: id },
        success: function (result) {
            var registros = result;
            var estado = null;
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["tipoMov"] + "</td>";
                html += "<td>" + registros[i]["monto"] + "</td>";
                html += "<td>" + registros[i]["interesesDelMes"] + "</td>";
                html += "<td>" + registros[i]["plazaResta"] + "</td>";
                html += "<td>" + registros[i]["nuevoSaldo"] + "</td>";
                html += "<td>" + registros[i]["fecha"] + "</td>";
                html += "<td>" + registros[i]["insertedAt"] + "</td>";
                html += "</tr>";
            };
            $("#tbody_mov").html(html);
            $('#myModal').modal('show');
        }
    });
}