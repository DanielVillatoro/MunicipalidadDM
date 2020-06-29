var GLOBALTABLE = 0;
var table = null;
function getReporteMovimientoCXC() {
    if (GLOBALTABLE == 1) {
        table.destroy();
    }
    var fecha1 = document.getElementById("fecha1").value;
    var fecha2 = document.getElementById("fecha2").value;
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({
        url: "../../ReporteMovimientoCXC/GetReporte",
        type: "POST",
        dataType: "json",
        data: { Fecha1: fecha1, Fecha2: fecha2},
        success: function (result) {
            var registros = eval(result);
            html = ""
            var Total = 0;
            for (var i = 0; i < registros.length; i++) {
                html += "<tr>";
                html += "<td>" + registros[i]["tipo"] + "</td>";
                html += "<td>" + registros[i]["doc_num"] + "</td>";
                html += "<td>" + registros[i]["doc_ref"] + "</td>";
                html += "<td>" + registros[i]["cod_clte"] + "</td>";
                html += "<td>" + registros[i]["nom_real"] + "</td>";
                html += "<td align='right'>" + formatNumber.new(registros[i]["monto"] )+ "</td>";
                //html += "<td>" + registros[i]["cod_real"] + "</td>";
                html += "<td>" + registros[i]["fechaFinal"] + "</td>";
                html += "</tr>";
                var siguienteint = i + 1;
                if (siguienteint < registros.length) {
                    var tipoSiguiente = registros[siguienteint]["tipo"];
                    if (registros[i]["tipo"] != tipoSiguiente) {
                        Total += registros[i]["monto"];
                        html += "<tr><td></td><td></td><td></td><td></td><td><b>TOTAL: </b></td><td><b>" +formatNumber.new(Total)+ "</b></td><td></td></tr>";
                        html += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                        Total = 0;
                    }
                    else {
                        Total += registros[i]["monto"];
                    }
                }
                else {
                    Total += registros[i]["monto"];
                    html += "<tr><td></td><td></td><td></td><td></td><td><b>TOTAL: </b></td><td><b>" + formatNumber.new(Total) + "</b></td><td></td></tr>";
                }
            };
            GLOBALTABLE = 1;
            $("#listaClientesCXC").html(html);
            document.getElementById("spinner-front").classList.remove("show")
            document.getElementById("spinner-back").classList.remove("show");
            table=$('#tbl_reporteMovimientoCXC').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                },
                "bSort": false,
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5', 'pdfHtml5', 'csvHtml5'
                ]
            });
        }
    });
}


function generaExcel() {
    var fecha1 = document.getElementById("fecha1").value;
    var fecha2 = document.getElementById("fecha2").value;
    var usuario = $("#stringNombreUsuario").text();
    var archivo = "../temp/" + usuario + "ReporteCXC.xlsx";
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    $.ajax({
        url: "../../ReporteMovimientoCXC/GeneraExcel",
        type: "POST",
        dataType: "json",
        data: { Fecha1: fecha1, Fecha2: fecha2 },
        success: function (result) {
            if (result == 1) {
                window.location.href = archivo;
            }
            else {
                alertify.error('Error.Problema al generar el reporte CXC.');
            }
            document.getElementById("spinner-front").classList.remove("show")
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