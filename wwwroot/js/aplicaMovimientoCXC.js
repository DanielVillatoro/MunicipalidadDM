var GlobalId = null;
var GlobalNombre = null;
var GlobalContadorChecks = null;
var GlobalDatatableMovimiento = 0;
var GlobalTable = null;
var GLobalCantFacturas = 0;
var GlobalNombreDoc = null;
//TRAE TODAS LAS FACTURAS ASOCIADAS AL CLIENTE SELECCIONADO, ADEMAS DE MOSTRARLOS A LA VISTA.
function getDatosCliente(id, nombre) {
    GlobalId = id;
    GlobalNombre = nombre;
    document.getElementById("movimientobutton").click();
    limpiarDatos();
    limpiarDatosDeposito();
    var tableHtml = "<table class='table table-striped table-bordered dt-responsive nowrap' id='tbl_cliente'><thead><tr><th scope='col'>Seleccionar</th><th scope='col'>Tipo</th><th scope='col'>Documento</th><th scope='col'>Referencia</th><th scope='col'>Fecha</th><th scope='col'>Vencimiento</th><th scope='col'>Monto</th><th scope='col'>Saldo</th><th scope='col'>Abono</th></tr></thead><tbody id='tbody_facAsociada'></tbody></table >";
    $("#tableFacturas").html(tableHtml);
    $("#numCodigo").text('Codigo: ' + id);
    $("#numCodigoCliente").text(id);
    $("#nombreCliente").text('Cliente: ' + nombre);
    var tipoDoc = $('#selectTipoDoc').find(":selected").text();
    GlobalNombreDoc = tipoDoc;
    GLobalCantFacturas = 0;
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({//CONSULTA AJAX QUE TRAE EL CONSECUTIVO DEPENDIENDO DEL PRIMER OPTION QUE CONTENGA EL INPUT DE TIPOS DE DOCUMENTO.
        url: "../../MovimientoCXC/ObtieneConsecutivoNumDoc",
        type: "POST",
        dataType: "json",
        data: { NombreDoc: tipoDoc },
        success: function (result) {
            document.getElementById("numDoc").value = result;
        }
    });
    $.ajax({//CONSULTA AJAX QUE TRAE LAS FACTURAS, parametro: ID DEL CLIENTE.
        url: "../../MovimientoCXC/ObtieneFac",
        type: "POST",
        dataType: "json",
        data: { IdCliente: id },
        success: function (result) {
            var registros = result;
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td><center><input class='orm-check-input position-static' id='" + registros[i]["id"] + "check' type='checkbox' value='" + registros[i]["id"] + "' id='' onclick='facturaSeleccionada(" + registros[i]["id"] + ")'></center></td>";
                html += "<td>" + registros[i]["tipo"] + "</td>";
                html += "<td>" + registros[i]["doc_num"] + "</td>";
                html += "<td>" + registros[i]["doc_ref"] + "</td>";
                html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                html += "<td>" + registros[i]["fechaFinalVencimiento"] + "</td>";
                html += "<td>" + formatNumber.new((registros[i]["monto"]).toFixed(2)) + "</td>";
                html += "<td id='" + registros[i]["id"] + "saldo'>" + formatNumber.new((registros[i]["saldo"]).toFixed(2)) + "</td>";
                html += "<td><input type='number' class='form-control form-control-sm saldoInput' data-id='" + registros[i]["id"] + "' id='" + registros[i]["id"] + "inputSaldo' value='0.00' onkeyup='sumar();' style='text-align:right;'></input></td>";
                html += "</tr>";
            };
            GLobalCantFacturas = registros.length;
            $("#tbody_facAsociada").html(html);
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}

//FUNCION QUE MUEVE EL SALDO AL INPUT DEL ABONO AL SELECCIONAR LA FACTURA
function facturaSeleccionada(id) {
    var idCheck = id + "check";
    var idSaldoInput = id + "inputSaldo";
    var saldoValor = id + "saldo";
    var montoMoratorioId = id + "montoMoratorio";
    var checkBox = document.getElementById(idCheck);
    var saldo = eliminaFormato(document.getElementById(saldoValor).innerText);
    var saldoTotal = parseFloat(document.getElementById("totalValorTrue").value);
    var checkBoxMoratorio = document.getElementById("checkboxMoratorio");
    var montoMoratorio = 0;
    if (checkBoxMoratorio.checked == true) {
        montoMoratorio = eliminaFormato(document.getElementById(montoMoratorioId).innerText).toFixed(2);
    }
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        var totalMoratorioySaldo = parseFloat(saldo) + parseFloat(montoMoratorio);
        totalMoratorioySaldo = parseFloat(totalMoratorioySaldo).toFixed(2);
        document.getElementById(idSaldoInput).value = totalMoratorioySaldo;
        //var saldoInput = document.getElementById(idSaldoInput).value;
        saldoTotal += parseFloat(totalMoratorioySaldo);
        saldoTotal = parseFloat(saldoTotal).toFixed(2);
        var palabraTotal = "Total: " + formatNumber.new(saldoTotal);
        $("#totalValorFalse").text(palabraTotal);
        document.getElementById("totalValorTrue").value = saldoTotal;
        GlobalContadorChecks += 1;
    } else {
        saldo = document.getElementById(idSaldoInput).value;
        document.getElementById(idSaldoInput).value = "0.00";
        saldoTotal = saldoTotal - parseFloat(saldo).toFixed(2);
        saldoTotal = saldoTotal.toFixed(2);
        var palabraTotal = "Total: " + formatNumber.new(saldoTotal);
        $("#totalValorFalse").text(palabraTotal);
        document.getElementById("totalValorTrue").value = saldoTotal;
        GlobalContadorChecks -= 1;
    }
}

//FUNCION QUE NOS TRAE EL CONSECUTIVO DEL TIPO DE DOCUMENTO SELECCIONADO
function getDocSelect() {
    var selectBox = document.getElementById("selectTipoDoc");
    var tipoDoc = selectBox.options[selectBox.selectedIndex].text;
    GlobalNombreDoc = tipoDoc;
    if (tipoDoc == "DEPOSITO") {
        limpiarDatosDeposito();
        $('#divContenidoMovimiento').hide();
        //$('#divDeposito').hide();
        $('#divContenidoDeposito').show();
        getDisponible();
        //$('#divLimiteReal').show();
        //if (GLobalCantFacturas == 0) {
        //    creaDeposito();
        //}
    }
    else {
        $('#divContenidoDeposito').hide();
        $('#divContenidoMovimiento').show();
        getDatosCliente(GlobalId, GlobalNombre);
    }
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({
        url: "../../MovimientoCXC/ObtieneConsecutivoNumDoc",
        type: "POST",
        dataType: "json",
        data: { NombreDoc: tipoDoc },
        success: function (result) {
            document.getElementById("numDoc").value = result;
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}

//FUNCION QUE SUMA AL TOTAL TODOS LOS INPUTS DE TIPO ABONO
function sumar() {
    var total = 0;
    $(".saldoInput").each(function () {
        if (isNaN(parseFloat($(this).val()))) {
            total += 0;
        } else {
            total += parseFloat($(this).val());
        }
    });
    var palabraTotal = "Total: " + formatNumber.new(total);
    $("#totalValorFalse").text(palabraTotal);
    document.getElementById("totalValorTrue").value = total;
}

//FUNCION ENCARGARDA DE AUMENTAR EL CONSECUTIVO SELECCIONADO DESPUES DE CUARDAR TODOS LOS DATOS A LAS FACTURAS ASOCIADAS Y DE INSERTAR LOS RECIBOS
function guardarRecibosReal() {
    if (GlobalContadorChecks > 0) {
        document.getElementById("spinner-front").classList.add("show");
        document.getElementById("spinner-back").classList.add("show");
        var observaciones = document.getElementById("observacionInput").value; //Observaciones
        var fecha = document.getElementById("fechaInput").value;
        $.ajax({
            url: "../../MovimientoCXC/ObtieneConsecutivoNumDoc",
            type: "POST",
            dataType: "json",
            data: { NombreDoc: GlobalNombreDoc },
            success: function (result) {
                numDoc = result;
                var selectDoc = document.getElementById('selectTipoDoc');
                var tipoDoc = selectDoc.value;//TIPO DE DOCUMENTO |RE,ND,NC
                var checkBoxMoratorio = document.getElementById("checkboxMoratorio");
                var esMoratorio = "0";    //1 si se le esta calculando intereses moratorios 0 si no
                var montoMoratorio = "0";
                $(".saldoInput").each(function () {
                    if (parseFloat($(this).val()) > 0) {
                        var idFa = $(this).attr("data-id");
                        var saldoValor = idFa + "saldo";
                        var saldoActual = eliminaFormato(document.getElementById(saldoValor).innerText);
                        var total = parseFloat($(this).val());//TOTAL DEL INPUT
                        var montoMoratorioId = idFa + "montoMoratorio";
                        if (checkBoxMoratorio.checked == true) {
                            esMoratorio = "1";
                            montoMoratorio = parseFloat(eliminaFormato(document.getElementById(montoMoratorioId).innerText));
                        }
                        var stop = 0;
                        var datos = { 'Observacion': observaciones, 'Fecha': fecha, 'NumDoc': numDoc, 'TipoDoc': tipoDoc, 'IdFa': idFa, 'Abono': total, 'EsMoratorio': esMoratorio, 'MontoMoratorio': montoMoratorio, 'SaldoActual': saldoActual };
                        var DatosJson = JSON.stringify(datos);
                        $.ajax({
                            url: "../../MovimientoCXC/guardaDatoRecibo",
                            type: "POST",
                            dataType: "json",
                            data: { Datos: DatosJson },
                            success: function (result) {
                                var resultado = result;
                            }
                        });
                    }
                });
                $.ajax({
                    url: "../../MovimientoCXC/AumentaConsecutivo",
                    type: "POST",
                    dataType: "json",
                    data: { TipoDoc: tipoDoc },
                    success: function (result) {
                        document.getElementById("spinner-front").classList.remove("show");
                        document.getElementById("spinner-back").classList.remove("show");
                        getDatosCliente(GlobalId, GlobalNombre);
                    }
                });
                alertify.success('Datos guardado correctamente');
            }
        });
    }
    else {
        alertify.error('Error.Debe seleccionar una factura al menos');
    }
}







//---------------------GlobalNombreDoc Contiene el documento seleccionado en el select
function guardarRecibos() {
    if (GlobalContadorChecks > 0) {
        agregaEspera();
        var observaciones = document.getElementById("observacionInput").value; //Observaciones
        var fecha = document.getElementById("fechaInput").value;
        var selectDoc = document.getElementById('selectTipoDoc');
        var tipoDoc = selectDoc.value;//TIPO DE DOCUMENTO |RE,ND,NC
        var checkBoxMoratorio = document.getElementById("checkboxMoratorio");
        var esMoratorio = "0";    //1 si se le esta calculando intereses moratorios 0 si no
        var montoMoratorio = "0";
        var verificaDatos = true;
        var stringConsulta = "";
        $(".saldoInput").each(function () {
            if (parseFloat($(this).val()) > 0) {
                var idFa = $(this).attr("data-id");
                var saldoValor = idFa + "saldo";
                var saldoActual = eliminaFormato(document.getElementById(saldoValor).innerText);
                var total = parseFloat($(this).val());//TOTAL DEL INPUT
                var montoMoratorioId = idFa + "montoMoratorio";
                if (checkBoxMoratorio.checked == true) {
                    esMoratorio = "1";
                    montoMoratorio = parseFloat(eliminaFormato(document.getElementById(montoMoratorioId).innerText));
                    //if (montoMoratorio > total || saldoActual < (total - montoMoratorio)) {
                    //    verificaDatos = false;
                    //}
                    total = total - montoMoratorio;
                }
                if (saldoActual + montoMoratorio < total) {
                    verificaDatos = false;
                }
                stringConsulta += idFa + "/" + total + "/" + montoMoratorio+"/";
            }
        });
        if (verificaDatos) {
            var datos = { 'Observacion': observaciones, 'Fecha': fecha, 'Cod_clte': GlobalId, 'TipoDoc': tipoDoc, 'EsMoratorio': esMoratorio };
            var DatosJson = JSON.stringify(datos);
            $.ajax({
                url: "../../MovimientoCXC/GuardaDatoMovimiento",
                type: "POST",
                dataType: "json",
                data: { Datos: DatosJson, Consulta: stringConsulta },
                success: function (result) {
                    alertify.success('Datos guardado correctamente');
                    quitaEspera();
                    getDatosCliente(GlobalId, GlobalNombre);
                }
            });
        }
        else {
            alertify.error('Error.Los montos son incorrectos.');
            quitaEspera();
        }
    }
    else {
        alertify.error('Error.Debe seleccionar una factura al menos');
    }
}















//FUNCION QUE LIMPIA TODOS EL FORMULARIO AL SELECCIONAR OTRO CLIENTE O AL GUARDAR LOS DATOS INGRESADOS
function limpiarDatos() {
    $("#tbody_facAsociada").empty();
    var total = 0;
    var palabraTotal = "Total: " + total;
    $("#totalValorFalse").text(palabraTotal);
    document.getElementById("totalValorTrue").value = total;
    //document.getElementById('fechaInput').value = '';
    document.getElementById('observacionInput').value = '';
    GlobalContadorChecks = 0;
}

//FUNCION QUE MUESTRA LOS INTERESES MORATORIOS, VARIANDO A LA FECHA ESTABLECIDA. SI NO EXISTE FECHA RETORNA UN MENSAJE DE VALIDACION
function getInteresesMoratorios() {
    limpiarDatos();
    var fecha = document.getElementById("fechaMoratoriaInput").value;
    if (fecha.length) {
        fecha = fecha.split("-");
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        var checkBox = document.getElementById("checkboxMoratorio");
        if (checkBox.checked == true) {
            var tableHtml = "<table class='table table-striped table-bordered dt-responsive nowrap' id='tbl_cliente'><thead><tr><th scope='col'>Seleccionar</th><th scope='col'>Tipo</th><th scope='col'>Documento</th><th scope='col'>Referencia</th><th scope='col'>Fecha</th><th scope='col'>Vencimiento</th><th scope='col'>Monto</th><th scope='col'>Saldo</th><th scope='col'>I. Moratorio</th><th scope='col'>Abono</th></tr></thead><tbody id='tbody_facAsociada'></tbody></table >";
            $("#tableFacturas").html(tableHtml);
            $.ajax({
                url: "../../MovimientoCXC/ObtieneFac",
                type: "POST",
                dataType: "json",
                data: { IdCliente: GlobalId },
                success: function (result) {
                    var registros = result;
                    html = "";
                    for (var i = 0; i < registros.length; i++) {
                        html += "<tr>";
                        html += "<td><center><input class='orm-check-input position-static' id='" + registros[i]["id"] + "check' type='checkbox' value='" + registros[i]["id"] + "' id='' onclick='facturaSeleccionada(" + registros[i]["id"] + ")'></center></td>";
                        html += "<td>" + registros[i]["tipo"] + "</td>";
                        html += "<td>" + registros[i]["doc_num"] + "</td>";
                        html += "<td>" + registros[i]["doc_ref"] + "</td>";
                        html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                        html += "<td>" + registros[i]["fechaFinalVencimiento"] + "</td>";
                        html += "<td>" + formatNumber.new((registros[i]["monto"]).toFixed(2)) + "</td>";
                        html += "<td id='" + registros[i]["id"] + "saldo'>" + formatNumber.new((registros[i]["saldo"]).toFixed(2)) + "</td>";
                        var fechaVencimiento = registros[i]["fechaFinalVencimiento"];
                        if (validate_fechaMayorQue(fechaVencimiento, fecha)) {
                            if (registros[i]["abono_moratorio"] == 0) {
                                var fecha1D = fechaVencimiento.split("-");
                                fecha1D = fecha1D[2] + "-" + fecha1D[1] + "-" + fecha1D[0];
                                var fecha2D = fecha.split("-");
                                fecha2D = fecha2D[2] + "-" + fecha2D[1] + "-" + fecha2D[0];
                                var diasMoratorio = diferenciaDia(fecha1D, fecha2D);
                                var montoMoratorio = (((registros[i]["saldo"]) * 2.4) / 100) / 30 * diasMoratorio;
                                html += "<td id='" + registros[i]["id"] + "montoMoratorio'>" + formatNumber.new(montoMoratorio.toFixed(2)) + "</td>";
                            }
                            else {
                                html += "<td id='" + registros[i]["id"] + "montoMoratorio'>" + formatNumber.new((registros[i]["monto_moratorio"]).toFixed(2)) + "</td>";
                            }
                        }
                        else {
                            html += "<td id='" + registros[i]["id"] + "montoMoratorio'>" + formatNumber.new((registros[i]["monto_moratorio"]).toFixed(2)) + "</td>";
                        }
                        //html += "<td><input type='number' class='form-control form-control-sm saldoInput' data-id='" + registros[i]["id"] + "' id='" + registros[i]["id"] + "inputSaldo' value='0.00' onkeyup='sumar();'></input></td>";
                        html += "<td><input type='text' class='form-control form-control-sm saldoInput' data-id='" + registros[i]["id"] + "' id='" + registros[i]["id"] + "inputSaldo' pattern='^\$\d{1,3}(,\d{3})*(\.\d+)?$' value='0.00' onkeyup='sumar();' style='text-align:right;'></input></td>";
                        html += "</tr>";
                    };
                    $("#tbody_facAsociada").html(html);
                }
            });
        } else {
            getDatosCliente(GlobalId, GlobalNombre);
        }
    }
    else {
        alertify.error('Error.Debe ingresar una fecha moratoria valida');
    }
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

function eliminaFormato(num) {
    var caracter = ",";
    num = num.replace(new RegExp(caracter, "g"), "");
    return parseFloat(num);
}

/**
        * Funcion que dadas dos fechas, valida que la fecha final sea
        * superior a la fecha inicial.
        * Tiene que recibir las fechas en formato español dd/mm/yyyy
        * Devuelve 1 si es mayor
        */
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

function diferenciaDia(fechainicial, fechaFinal) {
    var date_1 = new Date(fechainicial);
    var date_2 = new Date(fechaFinal);
    var day_as_milliseconds = 86400000;
    var diff_in_millisenconds = date_2 - date_1;
    var diff_in_days = diff_in_millisenconds / day_as_milliseconds;
    return diff_in_days;
}

function getDocumentosPrincipal() {
    if (GlobalId != null) {
        document.getElementById("spinner-front").classList.add("show");
        document.getElementById("spinner-back").classList.add("show");
        var clienteNombreDocument = "Cliente: " + GlobalNombre;
        $("#clienteDocument").text(clienteNombreDocument);
        $("#tbodyDocumentosPrincipal").empty();
        $.ajax({
            url: "../../MovimientoCXC/GetMovimientos",
            type: "POST",
            dataType: "json",
            data: { CodCliente: GlobalId },
            success: function (result) {
                var registros = result;
                html = "";
                for (var i = 0; i < registros.length; i++) {
                    var tipo = registros[i]["tipo"];
                    html += "<tr>";
                    html += "<td>" + registros[i]["doc_num"] + "</td>";
                    html += "<td>" + registros[i]["tipo"] + "</td>";
                    html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                    html += "<td>" + registros[i]["montoTotalMoratorio"] + "</td>";
                    html += "<td>" + registros[i]["montoTotal"] + "</td>";
                    html += "<td>" + registros[i]["usuario"] + "</td>";
                    if (registros[i]["estado"] == 1) {
                        html += "<td style='color: green;'><center>Activa</center></td>";
                    }
                    else {
                        html += "<td style='color: red;'><center>Nula</center></td>";
                    }
                    html += "<center><td><button id='" + tipo + registros[i]["doc_num"] + "' class='btn btn-primary' data-idReal='" + registros[i]["doc_num"] + "' data-id='" + tipo + "' data-estado='" + registros[i]["estado"] + "' onclick='getDocs(this.id)'><span class='fas fa-eye' aria-hidden='true'></span></button>"; //data-toggle='modal' data-target='#myModal'
                    html += "<button id='" + tipo + registros[i]["doc_num"] + "' class='btn btn-success' data-idReal='" + registros[i]["doc_num"] + "' data-id='" + tipo + "' data-estado='" + registros[i]["estado"] + "' onclick='getPDF(this.id)' style='margin-left: 10px;'><span class='fas fa-envelope' aria-hidden='true'></span></button>";
                    html += "<button id='" + tipo + registros[i]["doc_num"] + "' class='btn btn-danger' data-idReal='" + registros[i]["doc_num"] + "' data-id='" + tipo + "' data-estado='" + registros[i]["estado"] + "' onclick='creaPdf(this.id)' style='margin-left: 10px;'><span class='fas fa-file-pdf' aria-hidden='true'></span></button></td></center>";
                    html += "</tr>";
                };
                if (GlobalDatatableMovimiento == 1) {
                    GlobalTable.destroy();
                }
                $("#tbodyDocumentosPrincipal").html(html);
                GlobalTable = $('#tbl_documentos').DataTable({
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                    },
                    "bSort": false,
                    dom: 'Bfrtip',
                });
                GlobalDatatableMovimiento = 1;
                document.getElementById("spinner-front").classList.remove("show");
                document.getElementById("spinner-back").classList.remove("show");

            }
        });
    }
    else {
        alertify.error('Error.Debe seleccionar un cliente primero.');
    }
}
function getDocs(id) {
    var idDocument = document.getElementById(id);
    var tipo = idDocument.getAttribute('data-id');
    id = idDocument.getAttribute('data-idReal');
    if (idDocument.getAttribute('data-estado') == 0) {
        $("#btnAnular").prop("disabled", true);
    }
    else {
        $("#btnAnular").prop("disabled", false);
    }
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({//CONSULTA AJAX QUE TRAE LOS DOCUMENTOS CON EL MISMO CONSECUTIVO, parametro: ID DEL CLIENTE.
        url: "../../MovimientoCXC/GetDocsAsociado",
        type: "POST",
        dataType: "json",
        data: { IdDocumento: id, TipoDocumento: tipo },
        success: function (result) {
            var registros = result;
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["tipo"] + "</td>";
                html += "<td>" + registros[i]["doc_num"] + "</td>";
                html += "<td class='DocIDCell'>" + registros[i]["doc_ref"] + "</td>";
                html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                //html += "<td>" + registros[i]["fechaFinalVencimiento"] + "</td>"; 
                html += "<td>" + formatNumber.new(registros[i]["montoFinal"]) + "</td>";
                html += "<td>" + formatNumber.new(registros[i]["abono_moratorio"]) + "</td>";
                html += "</tr>";
            };
            var accion = "anularDoc('" + registros[0]["tipo"] + "'," + registros[0]["doc_num"] + ");"
            document.getElementById("btnAnular").setAttribute("onClick", accion);
            $("#tbody_doc").html(html);
            var observaciones = "Observación: " + registros[0]["observaciones"];
            $("#observacionText").text(observaciones);
            $('#myModal').modal('show');
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
        }
    });
}

function anularDoc(tipo, numMovimiento) {
    document.getElementById("spinner-frontModal").classList.add("show");
    document.getElementById("spinner-backModal").classList.add("show");
    var observaciones = document.getElementById("observacionAnularInput").value;
    if (observaciones != "") {
        var datos = { 'TipoDoc': tipo, 'NumMovimiento': numMovimiento };
        var DatosJson = JSON.stringify(datos);
        $.ajax({
            url: "../../MovimientoCXC/AnulaDocMovimiento",
            type: "POST",
            dataType: "json",
            data: { Datos: DatosJson, Observacion: observaciones },
            success: function (result) {
                alertify.success('Movimiento anulado correctamente');
                $('#myModal').modal('toggle');
                document.getElementById("spinner-frontModal").classList.remove("show");
                document.getElementById("spinner-backModal").classList.remove("show");
                getDocumentosPrincipal();
            }
        });
    }
    else {
        alertify.error('Error.Debe ingresar una observación');
        document.getElementById("spinner-frontModal").classList.remove("show");
        document.getElementById("spinner-backModal").classList.remove("show");
    }
}

var GlobalpdfDocumentId = null;
var GlobalTipoDocumento = null;
function getPDF(id) {
    var idDocument = document.getElementById(id);
    var tipo = idDocument.getAttribute('data-id');
    id = idDocument.getAttribute('data-idReal');
    $.ajax({//CONSULTA AJAX QUE TRAE El correo
        url: "../../MovimientoCXC/GetCorreoCliente",
        type: "POST",
        dataType: "json",
        data: { IdDocumento: id, TipoDocumento: tipo },
        success: function (result) {
            document.getElementById("correoEnviarInput").value = result;
            $("#modalCorreo").modal("show");
            GlobalpdfDocumentId = id;
            GlobalTipoDocumento = tipo;
        }
    });
}

function enviarPdf() {
    id = GlobalpdfDocumentId;
    tipo = GlobalTipoDocumento;
    correo = document.getElementById("correoEnviarInput").value;
    var idDocument = document.getElementById(tipo+id);
    estado = idDocument.getAttribute('data-estado');
    $.ajax({//CONSULTA AJAX QUE TRAE LOS DOCUMENTOS CON EL MISMO CONSECUTIVO, parametro: ID DEL CLIENTE.
        url: "../../MovimientoCXC/CreaPDF",
        type: "POST",
        dataType: "json",
        data: { IdDocumento: id, TipoDocumento: tipo, Enviar: "1", Correo: correo, Estado: estado },
        success: function (result) {
            if (result == 1) {
                alertify.success('¡Movimiento enviado correctamente!');
            }
            else {
                alertify.error('Error.Al enviar el movimiento.');
            }
        }
    });
}

function creaPdf(id) {
    var idDocument = document.getElementById(id);
    var tipo = idDocument.getAttribute('data-id');
    id = idDocument.getAttribute('data-idReal');
    estado = idDocument.getAttribute('data-estado');
    $.ajax({//CONSULTA AJAX QUE TRAE LOS DOCUMENTOS CON EL MISMO CONSECUTIVO, parametro: ID DEL CLIENTE.
        url: "../../MovimientoCXC/CreaPDF",
        type: "POST",
        dataType: "json",
        data: { IdDocumento: id, TipoDocumento: tipo, Enviar: "0", Correo: "0", Estado: estado },
        success: function (result) {
            var archivo = "../temp/" + GlobalNombre + "Recibo.pdf";
            window.open(archivo, '_blank');
        }
    });
}


function guardarDeposito() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    var observaciones = document.getElementById("observacionInputDeposito").value; //Observaciones
    var fecha = document.getElementById("fechaInputDeposito").value;
    var numDocConsecutivo = document.getElementById("numDoc").value;
    var numeroDeposito = document.getElementById("numeroInputDeposito").value;
    var montoDeposito = document.getElementById("montoInputDeposito").value;
    var codigousuario = $("#numCodigoCliente").text();
    var datos = { 'Observacion': observaciones, 'Fecha': fecha, 'NumDoc': numDocConsecutivo, 'NumeroDeposito': numeroDeposito, 'MontoDeposito': montoDeposito, 'Cod_clte': codigousuario };
    var DatosJson = JSON.stringify(datos);
    if (observaciones != "" && numeroDeposito != "" && montoDeposito != "") {
        if (montoDeposito > 0) {
            $.ajax({//CONSULTA AJAX QUE TRAE LOS DOCUMENTOS CON EL MISMO CONSECUTIVO, parametro: ID DEL CLIENTE.
                url: "../../MovimientoCXC/GuardaDeposito",
                type: "POST",
                dataType: "json",
                data: { Datos: DatosJson },
                success: function (result) {
                    if (result == 1) {
                        alertify.success('Deposito generado correctamente.');
                        limpiarDatosDeposito();
                        getDisponible();
                        document.getElementById("spinner-front").classList.remove("show")
                        document.getElementById("spinner-back").classList.remove("show");
                    }
                }
            });
            //alertify.success('Deposito generado correctamente.');
            //limpiarDatosDeposito();
            //getDisponible();
            //document.getElementById("spinner-front").classList.remove("show")
            //document.getElementById("spinner-back").classList.remove("show");
        }
        else {
            alertify.error('El monto del deposito debe ser mayor a 0.');
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
        }
    }
    else {
        alertify.error('Error.Debe ingresar todos los datos.');
        document.getElementById("spinner-front").classList.remove("show")
        document.getElementById("spinner-back").classList.remove("show");
    }
}

function sumarInputDeposito() {
    var montoDeposito = document.getElementById("montoInputDeposito").value;
    if (montoDeposito == "" || montoDeposito < 0) {
        montoDeposito = 0;
    }
    var totalDisponible = parseFloat($("#disponibleTrue").text());
    var total = (parseFloat(montoDeposito) + totalDisponible).toFixed(2);
    total = formatNumber.new(total);
    $("#saldoDisponibleDeposito").text(total);

    //html += "<h5 style='text-align: center;'>" + total + "</h5>";
    //$("#saldoDisponibleDeposito").html(html); 

}


$("#clienteButton").click(function () {
    $("#liCliente").addClass("active");
    $("#liMovimiento").removeClass("active");
    $("#liDocumento").removeClass("active");
});

$("#movimientobutton").click(function () {
    $("#liMovimiento").addClass("active");
    $("#liCliente").removeClass("active");
    $("#liDocumento").removeClass("active");
});

$("#documentobutton").click(function () {
    $("#liDocumento").addClass("active");
    $("#liMovimiento").removeClass("active");
    $("#liCliente").removeClass("active");
});

function limpiarDatosDeposito() {
    $("#tbodyDatosLimite").empty();
    document.getElementById('observacionInputDeposito').value = '';
    document.getElementById('numeroInputDeposito').value = '';
    document.getElementById('montoInputDeposito').value = '';
    $.ajax({//CONSULTA AJAX QUE TRAE EL CONSECUTIVO DEPENDIENDO DEL PRIMER OPTION QUE CONTENGA EL INPUT DE TIPOS DE DOCUMENTO.
        url: "../../MovimientoCXC/ObtieneConsecutivoNumDoc",
        type: "POST",
        dataType: "json",
        data: { NombreDoc: "DEPOSITO" },
        success: function (result) {
            document.getElementById("numDoc").value = result;
        }
    });
}


function getDisponible() {
    var codigocliente = $("#numCodigoCliente").text();
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    var FACTURADO = 0;
    $.ajax({
        url: "../../MovimientoCXC/GetDatosFacturado",
        type: "POST",
        dataType: "json",
        data: { CodigoCliente: codigocliente },
        success: function (result) {
            FACTURADO = result;
            $.ajax({
                url: "../../MovimientoCXC/GetDatosLimite",
                type: "POST",
                dataType: "json",
                data: { CodigoCliente: codigocliente },
                success: function (result) {
                    var registros = result;
                    html = "";
                    for (var i = 0; i < registros.length; i++) {
                        html += "<tr>";
                        html += "<td style='text-align: center; font-size: 25px;'>" + formatNumber.new((registros[i]["limite"]).toFixed(2)) + "</td>";
                        html += "<td style='text-align: center; font-size: 25px;'>" + formatNumber.new(FACTURADO) + "</td>";
                        html += "<td id='saldoDisponibleDeposito' style='text-align: center; font-size: 25px;'>" + formatNumber.new((registros[i]["limite"] - FACTURADO).toFixed(2)) + "</td>";
                        html += "</tr>";
                    };
                    $("#tbodyDatosLimite").html(html);
                    var limiteReal = registros[0]["limite"] - FACTURADO;
                    var htmlDisponible = "<p id='disponibleTrue' class='invisible'>" + limiteReal + "</p>";
                    $("#hideElements").html(htmlDisponible);
                    document.getElementById("spinner-front").classList.remove("show")
                    document.getElementById("spinner-back").classList.remove("show");
                }
            });
        }
    });
}

function agregaEspera() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
}

function quitaEspera() {
    document.getElementById("spinner-front").classList.remove("show");
    document.getElementById("spinner-back").classList.remove("show");
}