using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropietarioPropiedadController : Controller
    {
        public IActionResult Index()
        {
            Models.PropiedadModel propiedadModel = new Models.PropiedadModel();
            DataTable clientesDataTable = propiedadModel.GetPropiedades();
            Entities.PropiedadEntitie datosPropiedad = new Entities.PropiedadEntitie();
            datosPropiedad.PropiedadDB = clientesDataTable;
            return View(datosPropiedad);
        }

        public JsonResult GetPropietarios(string IdPropiedad)
        {
            Models.PropiedadModel estadoModel = new Models.PropiedadModel();
            DataTable datosPropietarios = estadoModel.GetPropietarios(IdPropiedad);
            return Json(datosPropietarios);
        }
    }
}