var GLOBALTABLE = 0;
var tableDT = null;
function getReporteCompras(descargar) {
    $("#divReporte").empty();
    if (GLOBALTABLE == 1) {
        tableDT.destroy();
    }
    var fecha1 = document.getElementById("fecha1").value;
    var fecha2 = document.getElementById("fecha2").value;
    var optradioReporte = $('input:radio[name=optradioReporte]:checked').val();
    var optradioTipo = $('input:radio[name=optradioTipo]:checked').val();
    var usuario = $("#stringNombreUsuario").text();
    var archivo = "../temp/" + usuario + "ReporteCompras.xlsx";
    //alert(optradioTipo);
    alertify.success('Generando Reporte, espere...');
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({
        url: "../../ReporteCompra/GetReporte",
        type: "POST",
        dataType: "json",
        data: { Fecha1: fecha1, Fecha2: fecha2, InputTipoReporte: optradioReporte, tipo_doc: optradioTipo, Descargar: descargar },
        success: function (result) {
            var registros = result;
            html = "";
            if (optradioReporte == 0) {
                var table = "<table class='table table-striped table-bordered dt-responsive nowrap table-responsive' id='tbl_reporteCompra'><thead><tr><th scope='col'>Factura</th><th scope='col'>Fecha</th><th scope='col'>Costo</th><th scope='col'>Utilidad</th><th scope='col'>Total Exento</th><th scope='col'>Total Gravado</th><th scope='col'>Descuento Gravado</th><th scope='col'>Descuento Exento</th><th scope='col'>Total Impuesto</th><th scope='col'>Total</th><th scope='col'>Moneda</th><th scope='col'>Cambio</th><th scope='col'>Id</th><th scope='col'>Cliente</th><th scope='col'>Cedula</th><th scope='col'>Usuario</th></tr></thead><tbody id='tbodyReporteCompraDetallado'></tbody></table >";
                $("#divReporte").html(table);
                var totalCosto = 0;
                var totalUtilidad = 0;
                var totalExento = 0;
                var totalGravado = 0;
                var totalDescuentoExento = 0;
                var totalDescuentoGravado = 0;
                var totalImpuesto = 0;
                var total = 0;
                //document.getElementById('divReporteDetallado').classList.add('visible');
                //document.getElementById('divReporteDetallado').classList.remove('invisible');
                //document.getElementById('divReporterResumido').classList.add('invisible');
                for (var i = 0; i < registros.length; i++) {
                    html += "<tr>";
                    html += "<td>" + registros[i]["factura"] + "</td>";
                    html += "<td>" + registros[i]["fecha"] + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["costo"]) + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["utilidad"]) + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["totalExento"]) + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["totalGravado"]) + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["descuentoGravado"]) + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["descuentoExento"]) + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["totalImpuesto"]) + "</td>";
                    html += "<td align='right'>" + formatNumber.new(registros[i]["total"]) + "</td>";
                    html += "<td>" + registros[i]["moneda"] + "</td>";
                    html += "<td>" + registros[i]["t.Cambio"] + "</td>";
                    html += "<td>" + registros[i]["id"] + "</td>";
                    html += "<td>" + registros[i]["proovedor"] + "</td>";
                    html += "<td>" + registros[i]["identificacion"] + "</td>";
                    html += "<td>" + registros[i]["usuario"] + "</td>";
                    html += "</tr>";
                    totalCosto += registros[i]["costo"];
                    totalUtilidad += registros[i]["utilidad"];
                    totalExento += registros[i]["totalExento"];
                    totalGravado += registros[i]["totalGravado"];
                    totalDescuentoGravado += registros[i]["descuentoGravado"];
                    totalDescuentoExento += registros[i]["descuentoExento"];
                    totalImpuesto += registros[i]["totalImpuesto"];
                    total += registros[i]["total"];
                };
                html += "<tr><td><B>TOTAL: </B></td><td></td><td>" + formatNumber.new(totalCosto.toFixed(2)) + "</td><td>" + formatNumber.new(totalUtilidad.toFixed(2)) + "</td><td>" + formatNumber.new(totalExento.toFixed(2)) + "</td><td>" + formatNumber.new(totalGravado.toFixed(2)) + "</td><td>" + formatNumber.new(totalDescuentoGravado.toFixed(2)) + "</td><td>" + formatNumber.new(totalDescuentoExento.toFixed(2)) + "</td><td>" + formatNumber.new(totalImpuesto.toFixed(2)) + "</td><td>" + formatNumber.new(total.toFixed(2)) + "</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                $("#tbodyReporteCompraDetallado").html(html);
                document.getElementById("spinner-front").classList.remove("show")
                document.getElementById("spinner-back").classList.remove("show");
                if (descargar == 1) {
                    window.location.href = archivo;
                }
                tableDT = $('#tbl_reporteCompra').DataTable({
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                    },
                    "bSort": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'copyHtml5', 'pdfHtml5', 'csvHtml5'
                    ]
                });
                GLOBALTABLE = 1;
            }
            if (optradioReporte == 1) {
                //document.getElementById('divReporterResumido').classList.add('visible');
                //document.getElementById('divReporterResumido').classList.remove('invisible');
                //document.getElementById('divReporteDetallado').classList.add('invisible');
                var table = "<table class='table table-striped table-bordered dt-responsive nowrap table-responsive' id='tbl_reporteCompra'><thead><tr><th scope='col'>Fecha</th><th scope='col'>Costo</th><th scope='col'>Utilidad</th><th scope='col'>Total Exento</th><th scope='col'>Total Gravado</th><th scope='col'>Descuento Gravado</th><th scope='col'>Descuento Exento</th><th scope='col'>Total Impuesto</th><th scope='col'>Total</th></tr></thead><tbody id='tbodyReporteCompra'></tbody></table>";
                $("#divReporte").html(table);
                //document.getElementById('divReporteDetallado').classList.add('visible');
                //document.getElementById('divReporteDetallado').classList.remove('invisible');
                //document.getElementById('divReporterResumido').classList.add('invisible');
                for (var i = 0; i < registros.length; i++) {
                    html += "<tr>";
                    html += "<td>" + registros[i]["fecha"] + "</td>";
                    html += "<td align='right'>" + registros[i]["costo"] + "</td>";
                    html += "<td align='right'>" + registros[i]["utilidad"] + "</td>";
                    html += "<td align='right'>" + registros[i]["totalExento"] + "</td>";
                    html += "<td align='right'>" + registros[i]["totalGravado"] + "</td>";
                    html += "<td align='right'>" + registros[i]["descuentoGravado"] + "</td>";
                    html += "<td align='right'>" + registros[i]["descuentoExento"] + "</td>";
                    html += "<td align='right'>" + registros[i]["totalImpuesto"] + "</td>";
                    html += "<td align='right'>" + registros[i]["total"] + "</td>";
                    html += "</tr>";
                };
                $("#tbodyReporteCompra").html(html);
                document.getElementById("spinner-front").classList.remove("show")
                document.getElementById("spinner-back").classList.remove("show");
                if (descargar == 1) {
                    window.location.href = archivo;
                }
                tableDT = $('#tbl_reporteCompra').DataTable({
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                    },
                    "bSort": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'copyHtml5', 'pdfHtml5', 'csvHtml5'
                    ]
                });
                GLOBALTABLE = 1;
            }
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