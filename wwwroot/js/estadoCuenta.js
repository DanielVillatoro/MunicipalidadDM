GLOBALCODCLIENTE = null;
GLOBALNOMBRECLIENTE = null;
GLOBALTIPO = null;
GLOBALESMORATORIO = null;
var GLOBALTABLE = 0;
var tableDT = null;
function getDatosCliente(id, nombre) {
    document.getElementById("estadoButton").click();
    $("#numCodigo").text('Codigo: ' + id);
    $("#numCodigoCliente").text(id);
    $("#nombreCliente").text('Cliente: ' + nombre);
    GLOBALCODCLIENTE = id;
    GLOBALNOMBRECLIENTE = nombre;
    getFacturas("activo");
}

function getFacturas(tipo) {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    GLOBALESMORATORIO = "0";
    GLOBALTIPO = tipo;
    if (GLOBALTABLE == 1) {
        tableDT.destroy();
    }
    var tableHtml = "<table class='table table-striped table-bordered dt-responsive nowrap table-responsive' id='tbl_facs'><thead><tr><th scope='col'>Tipo</th><th scope='col'># Doc</th><th scope='col'>Referencia</th><th scope='col'>Fecha</th><th scope='col'>Vence</th><th scope='col'>Monto</th><th scope='col'>Saldo</th><th scope='col'>Saldo Acumulado</th><th scope='col'>Dias</th><th scope='col'>Placa</th><th scope='col'>OC</th><th scope='col'>KLM</th><th scope='col'>Litros</th><th scope='col'>Facturado a</th></tr></thead><tbody id='tbody_facAsociada'></tbody></table >";
    $("#tableFacturas").html(tableHtml);
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../EstadoCuenta/ObtieneFacturas",
        type: "POST",
        dataType: "json",
        data: { IdCliente: GLOBALCODCLIENTE, TipoConsulta: GLOBALTIPO },
        success: function (result) {
            var registros = result;
            html = "";
            var acumuladoSaldo = 0;
            var f = new Date();
            var fechaActual = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
            //alert(fechaActual);
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["tipo"] + "</td>";
                html += "<td>" + registros[i]["doc_num"] + "</td>";
                html += "<td>" + registros[i]["doc_ref"] + "</td>";
                html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                html += "<td>" + registros[i]["fechaFinalVencimiento"] + "</td>";
                html += "<td style='text-align:right;'>" + formatNumber.new((registros[i]["monto"]).toFixed(2)) + "</td>";
                var saldoDato = registros[i]["saldo"];
                if (saldoDato == null) {
                    saldoDato = 0;
                }
                html += "<td id='" + registros[i]["id"] + "saldo' style='text-align:right;'>" + formatNumber.new(saldoDato.toFixed(2)) + "</td>";
                if (registros[i]["tipo"] == "FA" || registros[i]["tipo"] == "OE") {
                    acumuladoSaldo += registros[i]["saldo"];
                }
                html += "<td style='text-align:right;'>" + formatNumber.new(acumuladoSaldo.toFixed(2)) + "</td>";
                var fechaVence = registros[i]["fechaFinalVencimiento"];
                var dias = 0;
                if (fechaVence != null) {
                    fechaVence = fechaVence.split("-");
                    fechaVence = fechaVence[2] + "-" + fechaVence[1] + "-" + fechaVence[0];
                    dias = diferenciaDia(fechaVence, fechaActual);
                }
                dias *= -1;
                //alert(dias);
                html += "<td>" + dias.toFixed(0) + "</td>";
                html += "<td>" + registros[i]["placa"] + "</td>";
                html += "<td>" + registros[i]["oc"] + "</td>";
                html += "<td>" + registros[i]["klm"] + "</td>";
                html += "<td>" + registros[i]["litros"] + "</td>";
                html += "<td>" + registros[i]["nom_real"]+ "</td>";
                html += "</tr>";
            };
            $("#tbody_facAsociada").html(html);
            $("#totalSaldoView").text("Saldo: " + formatNumber.new(acumuladoSaldo.toFixed(2)));
            tableDT = $('#tbl_facs').DataTable({
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

function checkboxMovimientos() {
    var checkBoxMovimiento = document.getElementById("checkboxmovimientos");
    if (checkBoxMovimiento.checked == true) {
        GLOBALTIPO = "activo";
        getFacturas("activo");
    }
    else {
        GLOBALTIPO = "all";
        getFacturas("all");
    }
}


function getInteresesMoratorios() {
    //limpiarDatos();
    var fecha = document.getElementById("fechaMoratoriaInput").value;
    if (fecha.length) {
        fecha = fecha.split("-");
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        var checkBox = document.getElementById("checkboxMoratorio");
        if (checkBox.checked == true) {
            if (GLOBALTABLE == 1) {
                tableDT.destroy();
            }
            document.getElementById("spinner-front").classList.add("show");
            document.getElementById("spinner-back").classList.add("show");
            GLOBALESMORATORIO = "1";
            var tableHtml = "<table class='table table-striped table-bordered dt-responsive nowrap table-responsive' id='tbl_facs'><thead><tr><th scope='col'>Tipo</th><th scope='col'># Doc</th><th scope='col'>Referencia</th><th scope='col'>Fecha</th><th scope='col'>Vence</th><th scope='col'>Monto</th><th scope='col'>Saldo</th><th scope='col'>Moratorio</th><th scope='col'>Saldo Acumulado</th><th scope='col'>Dias</th><th scope='col'>Placa</th><th scope='col'>Orden</th><th scope='col'>OC</th><th scope='col'>Facturado a</th></tr></thead><tbody id='tbody_facAsociada'></tbody></table >";
            $("#tableFacturas").html(tableHtml);
            $.ajax({
                url: "../../EstadoCuenta/ObtieneFacturas",
                type: "POST",
                dataType: "json",
                data: { IdCliente: GLOBALCODCLIENTE, TipoConsulta: GLOBALTIPO },
                success: function (result) {
                    var registros = result;
                    var acumuladoSaldo = 0;
                    var f = new Date();
                    var fechaActual = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
                    html = "";
                    for (var i = 0; i < registros.length; i++) {
                        html += "<tr>";
                        html += "<td>" + registros[i]["tipo"] + "</td>";
                        html += "<td>" + registros[i]["doc_num"] + "</td>";
                        html += "<td>" + registros[i]["doc_ref"] + "</td>";
                        html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                        html += "<td>" + registros[i]["fechaFinalVencimiento"] + "</td>";
                        html += "<td style='text-align:right;'>" + formatNumber.new((registros[i]["monto"]).toFixed(2)) + "</td>";
                        var saldoDato = registros[i]["saldo"];
                        if (saldoDato == null) {
                            saldoDato = 0;
                        }
                        html += "<td id='" + registros[i]["id"] + "saldo' style='text-align:right;'>" + formatNumber.new(saldoDato.toFixed(2)) + "</td>";
                        if (registros[i]["tipo"] == "FA" || registros[i]["tipo"]=="OE") {
                            acumuladoSaldo += registros[i]["saldo"];
                        }

                        var fechaVencimiento = registros[i]["fechaFinalVencimiento"];
                        if (fechaVencimiento == null) {
                            fechaVencimiento = "0000-00-00";
                        }
                        if (validate_fechaMayorQue(fechaVencimiento, fecha)) {
                            if (registros[i]["abono_moratorio"] == 0) {
                                var fecha1D = fechaVencimiento.split("-");
                                fecha1D = fecha1D[2] + "-" + fecha1D[1] + "-" + fecha1D[0];
                                var fecha2D = fecha.split("-");
                                fecha2D = fecha2D[2] + "-" + fecha2D[1] + "-" + fecha2D[0];
                                var diasMoratorio = diferenciaDia(fecha1D, fecha2D);
                                var montoMoratorio = (((registros[i]["saldo"]) * 2.4) / 100) / 30 * diasMoratorio;
                                html += "<td style='color: red; text-align:right;'>" + formatNumber.new(montoMoratorio.toFixed(2)) + "</td>";
                                acumuladoSaldo += montoMoratorio;
                            }
                            else {
                                html += "<td style='color: red; text-align:right;'>" + formatNumber.new((registros[i]["monto_moratorio"]).toFixed(2)) + "</td>";
                                acumuladoSaldo += registros[i]["monto_moratorio"];
                            }
                        }
                        else {
                            html += "<td style='color: red; text-align:right;'>" + formatNumber.new((registros[i]["monto_moratorio"]).toFixed(2)) + "</td>";
                            acumuladoSaldo += registros[i]["monto_moratorio"];
                        }
                        html += "<td style='text-align:right;'>" + formatNumber.new(acumuladoSaldo.toFixed(2)) + "</td>";
                        var fechaVence = registros[i]["fechaFinalVencimiento"];
                        var dias = 0;
                        if (fechaVence != null) {
                            fechaVence = fechaVence.split("-");
                            fechaVence = fechaVence[2] + "-" + fechaVence[1] + "-" + fechaVence[0];
                            dias = diferenciaDia(fechaVence, fechaActual);
                        }
                        dias *= -1;
                        //alert(dias);
                        html += "<td>" + dias.toFixed(0) + "</td>";
                        html += "<td>" + registros[i]["placa"] + "</td>";
                        html += "<td>" + registros[i]["oc"] + "</td>";
                        html += "<td>" + registros[i]["klm"] + "</td>";
                        html += "<td>" + registros[i]["nom_real"] + "</td>";
                        html += "</tr>";
                    };
                    $("#tbody_facAsociada").html(html);
                    $("#totalSaldoView").text("Saldo: " + formatNumber.new(acumuladoSaldo.toFixed(2)));
                    tableDT = $('#tbl_facs').DataTable({
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                        },
                        "bSort": false,
                        dom: 'Bfrtip',
                        buttons: [
                            'copyHtml5'
                        ]
                    });
                    document.getElementById("spinner-front").classList.remove("show");
                    document.getElementById("spinner-back").classList.remove("show");
                    GLOBALTABLE = 1;
                }
            });
        } else {
            getFacturas(GLOBALTIPO);
        }
    }
    else {
        alertify.error('Error.Debe ingresar una fecha moratoria valida');
    }
}

function getCorreo() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({//CONSULTA AJAX QUE TRAE El correo
        url: "../../EstadoCuenta/GetCorreo",
        type: "POST",
        dataType: "json",
        data: { CodigoCliente: GLOBALCODCLIENTE},
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
    var fecha = document.getElementById("fechaMoratoriaInput").value;
    fecha = fecha.split("-");
    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
    $.ajax({
        url: "../../EstadoCuenta/CreaPDFAUX",
        type: "POST",
        dataType: "json",
        data: { CodigoCliente: GLOBALCODCLIENTE, EsMoratorio: GLOBALESMORATORIO, TipoConsulta: GLOBALTIPO, Fecha: fecha },
        success: function (result) {
            var archivo = "../temp/" + GLOBALNOMBRECLIENTE + "EstadoCuenta.pdf";
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
    var fecha = document.getElementById("fechaMoratoriaInput").value;
    fecha = fecha.split("-");
    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
    $.ajax({
        url: "../../EstadoCuenta/CreaExcel",
        type: "POST",
        dataType: "text",
        data: { CodigoCliente: GLOBALCODCLIENTE, EsMoratorio: GLOBALESMORATORIO, TipoConsulta: GLOBALTIPO, Fecha: fecha },
        success: function (result) {
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
