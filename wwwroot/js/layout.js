function setConexionAgencia(ip, nombre, id) {
    alertify.success('Agencia ' + nombre + ' seleccionada correctamente,espere...');
    $.ajax({
        url: "../../Agencia/setAgencia",
        type: "POST",
        dataType: "json",
        data: { Ip: ip, Nombre: nombre, Id: id },
        success: function (result) {
            var registros = eval(result);
            html = ""
            for (var i = 0; i < registros.length; i++) {
                // alert(registros[i]["nombres"]);
                html += "<option value='" + registros[i]["id"] + "'>" + registros[i]["oficina"]+ "</option>";
            };
            $("#selectCompania").html(html);
            $("#agenciaActual").text('Agencia: ' + nombre);
            window.location.reload();
        }
    });

}

window.onload = function () {
    var selectBox = document.getElementById("selectCompania");
    selectBox.addEventListener('change', changeFunc);
    function changeFunc() {
        var id_compania = this.value;
        var selectedTexto = selectBox.options[selectBox.selectedIndex].text;
        alertify.success('Compañia seleccionada correctamente, espere...');
        //$("#" + selectedTexto).setAttribute("selected", true);
       // var nombre_compania = this.id;
        //alert(selected);
        $.ajax({
            url: "../../Compania/setCompania",
            type: "POST",
            dataType: "json",
            data: { Id: id_compania, Nombre: selectedTexto },
            success: function (result) {
                if (result == 1) {
                    window.location.reload();
                }
            }
        });
    }
}

$(document).ready(function () {
    $.ajax({
        url: "../../Compania/getCompaniaDefault",
        type: "POST",
        dataType: "json",
        data: { Id: 0 },
        success: function (result) {
            document.getElementById(result).selected = 'selected';
            //$("#" + result).setAttribute("selected", "selected");
        }
    });
});