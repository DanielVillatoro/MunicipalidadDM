using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropiedadPropietarioController : Controller
    {
        public IActionResult Index()
        {
            Models.PropietarioModel propietarioModel = new Models.PropietarioModel();
            DataTable clientesDataTable = propietarioModel.GetPropietarios();
            Entities.PropietarioEntitie datosPropietario = new Entities.PropietarioEntitie();
            datosPropietario.PropietarioDB = clientesDataTable;
            return View(datosPropietario);
        }

        public void prueba()
        {
            JsonResult pruebaS = GetPropiedades("1092");
        }
        public JsonResult GetPropiedades(string IdCliente)
        {
            Models.PropietarioModel estadoModel = new Models.PropietarioModel();
            DataTable datosPropiedades = estadoModel.GetPropiedades(IdCliente);
            return Json(datosPropiedades);
        }
    }
}