GLOBALCODCLIENTE = null;
GLOBALNOMBRECLIENTE = null;
GLOBALTIPO = null;
var GLOBALTABLE = 0;
var tableDT = null;
var GlobalCheck = null;
function getDatosCliente(id, nombre) {
    GLOBALCODCLIENTE = id;
    GLOBALNOMBRECLIENTE = nombre;
    document.getElementById("balanceButton").click();
    $("#numCodigo").text('Cod: ' + id);
    $("#numCodigoCliente").text(id);
    $("#nombreCliente").text('Cliente: ' + nombre);
    $("#liCliente").removeClass("active");
    $("#liBalance").addClass("active");
    actualizaFecha();
}

//OBTIENE EL BALANCE GENERAL
function getBalance(tipo) {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    GLOBALTIPO = tipo;
    var fecha1 = document.getElementById('fecha1').value;
    var fecha2 = document.getElementById('fecha2').value;
    //$(".tableFacturas").empty();
    var tableHtml = "<table class='table table-striped table-bordered dt-responsive nowrap' id='tbl_facs'><thead><tr><th scope='col'>Tipo</th><th scope='col'># Doc</th><th scope='col'>Fecha</th><th scope='col'>Monto</th><th scope='col'>Monto Acumulado</th><th scope='col'>Litros</th><th scope='col'>Placa</th><th scope='col'>Kilometraje</th><th scope='col'>OC</th></tr></thead><tbody id='tbody_facAsociada'></tbody></table >";
    $("#tableFacturas").html(tableHtml);
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../ReporteConsumo/ObtieneFacturas",
        type: "POST",
        dataType: "json",
        data: { IdCliente: GLOBALCODCLIENTE, TipoConsulta: GLOBALTIPO, Fecha1: fecha1, Fecha2: fecha2 },
        success: function (result) {
            var registros = result;
            var html = "";
            var acumuladoMonto = 0;
            var deposito = 0;
            var consumo = 0;
            var f = new Date();
            var fechaActual = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["tipo"] + "</td>";
                html += "<td>" + registros[i]["doc_num"] + "</td>";
                html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                var monto = registros[i]["montoFinal"] * -1;
                acumuladoMonto += monto;
                if (registros[i]["tipo"] == "OE" || registros[i]["tipo"] == "FA") {
                    monto *= -1;
                    consumo += monto;
                }
                else {
                    deposito += monto;
                }
                html += "<td style='text-align:right;'>" + formatNumber.new((monto).toFixed(2)) + "</td>";
                html += "<td style='text-align:right;'>" + formatNumber.new(acumuladoMonto.toFixed(2)) + "</td>";
                if (registros[i]["tipo"] == "OE" || registros[i]["tipo"] == "FA") {
                    html += "<td>" + registros[i]["litros"] + "</td>";
                    html += "<td>" + registros[i]["placa"] + "</td>";
                    html += "<td>" + registros[i]["klm"] + "</td>";
                }
                else {
                    html += "<td>" + + "</td>";
                    html += "<td>" + + "</td>";
                    html += "<td>" + + "</td>";
                }
                html += "<td>" + registros[i]["oc"] + "</td>";
                //html += "<td>" + registros[i]["placa"] + "</td>";
                html += "</tr>";
            };
            $("#tbody_facAsociada").html(html);
            //$("#totalSaldoView").text("Total Consumo: " + formatNumber.new(acumuladoMonto.toFixed(2)));
            var htmlTotales = "<tr><td style='text-align: center; font-size: 20px;'>" + formatNumber.new((deposito).toFixed(2)) + "</td><td style='text-align: center; font-size: 20px;'>" + formatNumber.new((consumo).toFixed(2)) + "</td><td style='text-align: center; font-size: 20px;'>" + formatNumber.new((acumuladoMonto).toFixed(2)) + "</td></tr>";
            $("#tbodyTotales").html(htmlTotales);
            $('#tbl_facs').DataTable({
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
            //GLOBALTABLE = 1;
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}


function actualizaFecha() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../ReporteConsumo/ObtieneFechaInicio",
        type: "POST",
        dataType: "text",
        data: { IdCliente: GLOBALCODCLIENTE },
        success: function (result) {
            if (result == "00/00/0000") {
                alertify.error('Error.El cliente seleccionado no tiene una fecha inicial.');
                document.getElementById("spinner-front").classList.remove("show");
                document.getElementById("spinner-back").classList.remove("show");
            }
            else {
                result = result.split("/");
                result = result[2] + "-" + result[1] + "-" + result[0];
                document.getElementById('fecha1').value = result;
                getBalance("balance");
                document.getElementById("spinner-front").classList.remove("show");
                document.getElementById("spinner-back").classList.remove("show");
            }
        }
    });
}


//CONSUMO
function getFacturas(tipo) {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    GLOBALTIPO = tipo;
    var fecha1 = document.getElementById('fecha1').value;
    var fecha2 = document.getElementById('fecha2').value;
    var tableHtml = "<table class='table table-striped table-bordered dt-responsive nowrap' id='tbl_facs'><thead><tr><th scope='col'>Factura #</th><th scope='col'>Tipo</th><th scope='col'>Fecha</th><th scope='col'>Monto</th><th scope='col'>Monto Acumulado</th><th scope='col'>Placa</th></tr></thead><tbody id='tbody_facAsociada'></tbody></table>";
    $("#tableFacturas").html(tableHtml);
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../ReporteConsumo/ObtieneFacturas",
        type: "POST",
        dataType: "json",
        data: { IdCliente: GLOBALCODCLIENTE, TipoConsulta: GLOBALTIPO, Fecha1: fecha1, Fecha2: fecha2 },
        success: function (result) {
            var registros = result;
            html = "";
            var acumuladoMonto = 0;
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["doc_num"] + "</td>";
                html += "<td>" + registros[i]["tipo"] + "</td>";
                html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                html += "<td style='text-align:right;'>" + formatNumber.new((registros[i]["montoFinal"]).toFixed(2)) + "</td>";
                acumuladoMonto += registros[i]["montoFinal"];
                html += "<td style='text-align:right;'>" + formatNumber.new(acumuladoMonto.toFixed(2)) + "</td>";
                html += "<td>" + registros[i]["placa"] + "</td>";
                html += "</tr>";
            };
            $("#tbody_facAsociada").html(html);
            $("#totalSaldoView").text("Total Consumo: " + formatNumber.new(acumuladoMonto.toFixed(2)));
            $('#tbl_facs').DataTable({
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
            GLOBALTABLE = 1;
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}

//Pagos
function getPagos(tipo) {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    GLOBALTIPO = tipo;
    var fecha1 = document.getElementById('fecha1').value;
    var fecha2 = document.getElementById('fecha2').value;
    var tableHtml = "<table class='table table-striped table-bordered dt-responsive nowrap' id='tbl_facs'><thead><tr><th scope='col'>Cuenta</th><th scope='col'># Doc</th><th scope='col'>Deposito</th><th scope='col'>Fecha Dep</th><th scope='col'>Monto</th><th scope='col'>Monto Acumulado</th></tr></thead><tbody id='tbody_facAsociada'></tbody></table >";
    $("#tableFacturas").html(tableHtml);
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../ReporteConsumo/ObtieneFacturas",
        type: "POST",
        dataType: "json",
        data: { IdCliente: GLOBALCODCLIENTE, TipoConsulta: GLOBALTIPO, Fecha1: fecha1, Fecha2: fecha2 },
        success: function (result) {
            var registros = result;
            html = "";
            var acumuladoMonto = 0;
            var f = new Date();
            var fechaActual = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["tipo"] + "</td>";
                html += "<td>" + registros[i]["doc_num"] + "</td>";
                html += "<td>" + registros[i]["observaciones"] + "</td>";
                html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                var monto = registros[i]["montoFinal"];
                if (monto < 0) {
                    monto *= -1;
                }
                html += "<td style='text-align:right;'>" + formatNumber.new((monto).toFixed(2)) + "</td>";
                acumuladoMonto += monto;
                html += "<td style='text-align:right;'>" + formatNumber.new(acumuladoMonto.toFixed(2)) + "</td>";
                html += "</tr>";
            };
            $("#tbody_facAsociada").html(html);
            $("#totalSaldoView").text("Monto: " + formatNumber.new(acumuladoMonto.toFixed(2)));
            $('#tbl_facs').DataTable({
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
            GLOBALTABLE = 1;
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}


function checkradiotipo(optradioTipo) {
    if (GLOBALCODCLIENTE != null) {
        GlobalCheck = optradioTipo;
        if (optradioTipo == "0") {
            $("#liCliente").removeClass("active");
            $("#liBalance").addClass("active");
            $("#liConsumo").removeClass("active");
            $("#liPago").removeClass("active");
            GLOBALTIPO = "balance";
            getBalance(GLOBALTIPO);
        }
        if (optradioTipo == "1") {
            $("#liCliente").removeClass("active");
            $("#liBalance").removeClass("active");
            $("#liConsumo").addClass("active");
            $("#liPago").removeClass("active");
            GLOBALTIPO = "consumo";
            getFacturas(GLOBALTIPO);
        }
        if (optradioTipo == "2") {
            $("#liCliente").removeClass("active");
            $("#liBalance").removeClass("active");
            $("#liConsumo").removeClass("active");
            $("#liPago").addClass("active");
            GLOBALTIPO = "pago";
            getPagos(GLOBALTIPO);
        }
    }
    else {
        alertify.error('Error.Debe seleccionar un cliente.');
    }
}

function recargar() {
    checkradiotipo(GlobalCheck);
}

$("#clienteButton").click(function () {
    $("#liCliente").addClass("active");
    $("#liBalance").removeClass("active");
    $("#liConsumo").removeClass("active");
    $("#liPago").removeClass("active");
});


function getCorreo() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({//CONSULTA AJAX QUE TRAE El correo
        url: "../../EstadoCuenta/GetCorreo",
        type: "POST",
        dataType: "json",
        data: { CodigoCliente: GLOBALCODCLIENTE },
        success: function (result) {
            document.getElementById("correoEnviarInput").value = result;
            $("#modalCorreo").modal("show");
            document.getElementById("spinner-front").classList.remove("show");
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}

function enviarEstado() {
    var correo = document.getElementById("correoEnviarInput").value;
    var fecha = document.getElementById("fechaMoratoriaInput").value;
    fecha = fecha.split("-");
    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
    $.ajax({//CONSULTA AJAX QUE TRAE El correo
        url: "../../EstadoCuenta/SendCorreo",
        type: "POST",
        dataType: "json",
        data: { CodigoCliente: GLOBALCODCLIENTE, EsMoratorio: GLOBALESMORATORIO, TipoConsulta: GLOBALTIPO, Correo: correo, Fecha: fecha },
        success: function (result) {
        }
    });
}

function creaPDF() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    var fecha1 = document.getElementById('fecha1').value;
    var fecha2 = document.getElementById('fecha2').value;
    $.ajax({
        url: "../../ReporteConsumo/CreaPDF",
        type: "POST",
        dataType: "text",
        data: { CodigoCliente: GLOBALCODCLIENTE, Fecha1: fecha1, Fecha2: fecha2 },
        success: function (result) {
            var archivo = "../temp/" + GLOBALNOMBRECLIENTE + "ReporteConsumo.pdf";
            //var url = $(this).attr(archivo);
            //window.open(url, '_blank');
            window.open(archivo, '_blank');
            //window.location.href = archivo;
            document.getElementById("spinner-front").classList.remove("show");
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}

function creaExcel() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    var fecha1 = document.getElementById('fecha1').value;
    var fecha2 = document.getElementById('fecha2').value;
    $.ajax({
        url: "../../ReporteConsumo/CreaExcel",
        type: "POST",
        dataType: "text",
        data: { CodigoCliente: GLOBALCODCLIENTE, Fecha1: fecha1, Fecha2: fecha2 },
        success: function (result) {
            alert(result);
            var archivo = "../temp/" + result;
            window.location.href = archivo;
            document.getElementById("spinner-front").classList.remove("show");
            document.getElementById("spinner-back").classList.remove("show");
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

//FORMATO: yyyy-mm-dd
function diferenciaDia(fechainicial, fechaFinal) {
    var date_1 = new Date(fechainicial);
    var date_2 = new Date(fechaFinal);
    var day_as_milliseconds = 86400000;
    var diff_in_millisenconds = date_2 - date_1;
    var diff_in_days = diff_in_millisenconds / day_as_milliseconds;
    return diff_in_days;
}

function validate_fechaMayorQue(fechaInicial, fechaFinal) {
    valuesStart = fechaInicial.split("-");
    valuesEnd = fechaFinal.split("-");
    // Verificamos que la fecha no sea posterior a la actual
    var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
    var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);
    if (dateStart >= dateEnd) {
        return 0;
    }
    return 1;
}
