var GlobalIdProp = null;
var GlobalNumFinca = null;
var GlobalDatatablePropiedades = 0;
var GlobalTablePropiedades = null;
var GlobalDatatablePropiedadesRP = 0;
var GlobalTablePropiedadesRP = null;
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

function setVariables(id, numFinca, tipoConsulta) {
    GlobalIdProp = id;
    GlobalNumFinca = numFinca;
    if (tipoConsulta === 1) {
        getRecibos();
    }
    if (tipoConsulta === 2) {
        getRecibosPendientes();
    }
    if (tipoConsulta === 3) {
        getComprobantes();
    }
}

function getRecibos() {
    document.getElementById("consultaButton").click();
    id = GlobalIdProp;
    nombre = GlobalNumFinca;
    //$("#numCodigo").text('Id: ' + id);
    $("#nombreCliente").text('Num Finca: ' + nombre);
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../PropiedadUsuarioCliente/GetRecibos",
        type: "POST",
        dataType: "json",
        data: { idPropiedad: id },
        success: function (result) {
            var registros = result;
            var estado = null;
            html = "";
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                //html += "<td>" + registros[i]["id"] + "</td>";
                //html += "<td>" + registros[i]["idPropiedad"] + "</td>";
                html += "<td>" + registros[i]["nombreCC"] + "</td>";
                html += "<td>" + registros[i]["fechaActual"] + "</td>";
                html += "<td>" + registros[i]["fechaVencimiento"] + "</td>";
                html += "<td>" + registros[i]["monto"] + "</td>";
                if (registros[i]["estado"] == 0) {
                    estado = "Pendiente";
                }
                if (registros[i]["estado"] == 1) {
                    estado = "<center><a id='" + registros[i]["id"] + "' class='btn btn-primary border-0 rounded-0 p-0;' onclick='verComprobante(this.id); return false;'><i class='fa fa-play' aria-hidden='true'></i><span>Ver Comprobante</span></a></center>";
                }
                if (registros[i]["estado"] == 2) {
                    estado = "Anulado";
                }
                html += "<td>" + estado + "</td>";
            };
            $("#tbodyRecibos").html(html);
            $('#tbl_Recibo').DataTable({
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
        }
    });
}
function verComprobante(id) {
    $("#tbody_comprobantes").empty();
    if (GlobalDatatablePropiedades == 1) {
        GlobalTablePropiedades.destroy();
    }
    $.ajax({//CONSULTA AJAX QUE TRAE LAS PROPIEDADES, parametro: ID DEL CLIENTE.
        url: "../../PropiedadUsuarioCliente/GetComprobantes",
        type: "POST",
        dataType: "json",
        data: { idRecibo: id },
        success: function (result) {
            var registros = result;
            html = "";
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                //html += "<td>" + registros[i]["id"] + "</td>";
                html += "<td>" + registros[i]["fecha"] + "</td>";
                html += "<td>" + registros[i]["descripcion"] + "</td>";
                html += "<td>" + registros[i]["totalPagado"] + "</td>";
            };
            $("#tbody_comprobantes").html(html);
            GlobalTablePropiedades = $('#tbl_comprobante').DataTable({
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
            $('#myModal').modal('show');
        }
    });
}

var datosRecibo = [];
var objetoRecibo = {};
function getRecibosPendientes() {
    datosRecibo = [];
    objetoRecibo = {};
    id = GlobalIdProp;
    nombre = GlobalNumFinca;
    //$("#numCodigoRP").text('Id: ' + id);
    $("#nombreClienteRP").text('Num Finca: ' + nombre);
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../PropiedadUsuarioCliente/GetRecibos",
        type: "POST",
        dataType: "json",
        data: { idPropiedad: id },
        success: function (result) {
            var registros = result;
            var estado = null;
            html = "";
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                if (registros[i]["estado"] == 0) {
                    html += "<tr>";
                    //html += "<td>" + registros[i]["id"] + "</td>";
                    //html += "<td>" + registros[i]["idPropiedad"] + "</td>";
                    html += "<td id='" + registros[i]["id"] + "CC' value='" + registros[i]["idCC"] + "'>" + registros[i]["nombreCC"] + "</td>";
                    html += "<td>" + registros[i]["fechaActual"] + "</td>";
                    html += "<td>" + registros[i]["fechaVencimiento"] + "</td>";
                    html += "<td id='" + registros[i]["id"] + "monto'>" + registros[i]["monto"] + "</td>";
                    html += "<td><center><input class='orm-check-input position-static' id='" + registros[i]["id"] + "check' type='checkbox' value='" + registros[i]["id"] + "' name='recibos[]'></center></td>";
                    datosRecibo.push({
                        "id": registros[i]["id"],
                        "cc": registros[i]["idCC"]
                    });
                }
            };
            $("#tbodyRecibosPendientes").html(html);
        }
    });
}

var datosPago = [];
var objetoPago = {};

function cotizaRecibos() {
    datosPago = [];
    var selected = '';
    $('input[type=checkbox]').each(function () {
        if (this.checked) {
            selected += $(this).val() + ', ';//ID
            datosPago.push({
                "id": $(this).val()
            });
        }
    });
    if (selected != '') {
        objetoPago.datosPago = datosPago;
        console.log(JSON.stringify(objetoPago));

        objetoRecibo.datosRecibo = datosRecibo;
        console.log(JSON.stringify(objetoRecibo));
        $.ajax({
            url: "../../PropiedadUsuarioCliente/GetTotalPago",
            type: "POST",
            dataType: "json",
            data: { JsonTotalRecibo: JSON.stringify(objetoRecibo), JsonTotalPago: JSON.stringify(objetoPago) },
            success: function (result) {
                //$("#totalPagotxt").text('Total a pagar: ' + formatNumber.new((parseFloat(result)).toFixed(2)));
                var registros = result;
                var montoTotal = 0;
                html = "";
                console.log(result);
                for (var i = 0; i < registros.length; i++) {
                    html += "<tr>";
                    html += "<td>" + registros[i]["nombreCC"] + "</td>";
                    html += "<td>" + registros[i]["fechaActual"] + "</td>";
                    html += "<td>" + registros[i]["fechaVencimiento"] + "</td>";
                    html += "<td id='" + registros[i]["id"] + "monto'>" + registros[i]["monto"] + "</td>";
                    html += "</tr>";
                    montoTotal += registros[i]["monto"];
                };
                $("#tbodyDatosTotal").html("<tr style='text-align: center; font-size: 25px;'><td>" + formatNumber.new((parseFloat(montoTotal)).toFixed(2))+"</td></tr>");
                $("#tbody_recibosRP").html(html);
                $('#myModalRP').modal('show');
            }
        });
    }
    else {
        alert('Debes seleccionar al menos un recibo.');
    }
    return false;
}

function getCP() {
    id = GlobalIdProp;
    nombre = GlobalNumFinca;
    //$("#numCodigoCP").text('Id: ' + id);
    $("#nombreClienteCP").text('Num Finca: ' + nombre);
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../PropiedadUsuarioCliente/GetCP",
        type: "POST",
        dataType: "json",
        data: { idPropiedad: id },
        success: function (result) {
            var registros = result;
            var estado = null;
            html = "";
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                //html += "<td>" + registros[i]["id"] + "</td>";
                html += "<td>" + registros[i]["fecha"] + "</td>";
                html += "<td>" + registros[i]["descripcion"] + "</td>";
                html += "<td>" + registros[i]["totalPagado"] + "</td>";
                html += "<td><center><a id='" + registros[i]["id"] + "' class='btn btn-primary border-0 rounded-0 p-0;' onclick='verRecibosAsociados(this.id); return false;'><i class='fa fa-play' aria-hidden='true'></i><span>Ver Recibos</span></a></center></td>";
            };
            $("#tbodyCP").html(html);
        }
    });
}

function verRecibosAsociados(id) {
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../PropiedadUsuarioCliente/GetRecibosCP",
        type: "POST",
        dataType: "json",
        data: { idCP: id },
        success: function (result) {
            var registros = result;
            var estado = null;
            html = "";
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                //html += "<td>" + registros[i]["id"] + "</td>";
                //html += "<td>" + registros[i]["idPropiedad"] + "</td>";
                html += "<td id='" + registros[i]["id"] + "CC' value='" + registros[i]["idCC"] + "'>" + registros[i]["nombreCC"] + "</td>";
                html += "<td>" + registros[i]["fechaActual"] + "</td>";
                html += "<td>" + registros[i]["fechaVencimiento"] + "</td>";
                html += "<td id='" + registros[i]["id"] + "monto'>" + registros[i]["monto"] + "</td>";

            };
            $("#tbody_recibosCP").html(html);
            $('#myModalCP').modal('show');
        }
    });
}

function pagarRecibos() {
    $.ajax({
        url: "../../PropiedadUsuarioCliente/PagarRecibos",
        type: "POST",
        dataType: "text",
        data: { JsonTotalPago: JSON.stringify(objetoPago) },
        success: function (result) {
            alertify.success('Pago realizado correctamente');
            location.reload();
        }
    });
}

var formatNumber = {
    separador: ",", // separador para los miles
    sepDecimal: '.', // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
}