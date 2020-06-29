// --------------------------------------------OBTIENE CANTON RESPECTIVO A LA PROVINCIA-------------------------------------------------------------------
function obtieneCanton(idProvincia) {
    $.ajax({
        url: "http://localhost/exosFE/Inicio/obtieneCanton",
        type: "POST",
        data: { buscar: idProvincia },
        success: function (respuesta) {
            alert(respuesta);
            var registros = eval(respuesta);
            alert(registros);
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<option id='" + registros[i]["codigo"] + "'value='" + registros[i]["canton"] + "'data-id='"+registros[i]["id"]+"'/>";
            };
            $("#cantonInputList").html(html);
        }
    });
}

$(document).ready(function () {
    $("input[name=provinciaInput]").change(function () {
        var value = $("input[name=provinciaInput]").val();
        var data=$('#provinciaInputList [value="' + value + '"]').data('id');
        obtieneCanton(data);
    });
});
// ----------------------------------------------------CIERRE------------------------------------------------------------------------------
// --------------------------------------------OBTIENE DISTRITO RESPECTIVO AL CANTON-------------------------------------------------------------------
function obtieneDistrito(idDistrito) {
    $.ajax({
        url: "http://localhost/exosFE/Inicio/obtieneDistrito",
        type: "POST",
        data: { buscar: idDistrito },
        success: function (respuesta) {
            // alert(respuesta);
            var registros = eval(respuesta);
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<option id='" + registros[i]["codigo"] + "'value='" + registros[i]["distrito"] + "'data-id='"+registros[i]["id"]+"'/>";
            };
            $("#distritoInputList").html(html);
        }
    });
}

$(document).ready(function () {
    $("input[name=cantonInput]").change(function () {
        var value = $("input[name=cantonInput]").val();
        var data=$('#cantonInputList [value="' + value + '"]').data('id');
        obtieneDistrito(data);
    });
});
//-----------------------------------------------------CIERRE-------------------------------------------------------------------------------
function obtieneBarrio(idBarrio) {
    $.ajax({
        url: "http://localhost/exosFE/Inicio/obtieneBarrio",
        type: "POST",
        data: { buscar: idBarrio },
        success: function (respuesta) {
            // alert(respuesta);
            var registros = eval(respuesta);
            html = "";
            for (var i = 0; i < registros.length; i++) {
                html += "<option id='" + registros[i]["codigo"] + "'value='" + registros[i]["barrio"] + "'data-id='"+registros[i]["id"]+"'/>";
            };
            $("#barrioInputList").html(html);
        }
    });
}

$(document).ready(function () {
    $("input[name=distritoInput]").change(function () {
        var value = $("input[name=distritoInput]").val();
        var data=$('#distritoInputList [value="' + value + '"]').data('id');
        obtieneBarrio(data);
    });
});


function guardaDatosUbicacion(){
    var value = $("input[name=provinciaInput]").val();
    var provincia=$('#provinciaInputList [value="' + value + '"]').data('id');
    value = $("input[name=cantonInput]").val();
    var canton=$('#cantonInputList [value="' + value + '"]').data('id');
    value = $("input[name=distritoInput]").val();
    var distrito=$('#distritoInputList [value="' + value + '"]').data('id');
    value = $("input[name=barrioInput]").val();
    var barrio=$('#barrioInputList [value="' + value + '"]').data('id');
    var lista=provincia+","+canton+","+distrito+","+barrio;
    // alert(lista);
    $.ajax({
        url: "http://localhost/exosFE/Inicio/guardaDatosUbicacion",
        type: "POST",
        data: { listaUbicacion: lista }
    });
    // alert(data);
}


