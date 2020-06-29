using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class UsuarioPropiedadController : Controller
    {
        public IActionResult Index()
        {
            Models.PropiedadModel propiedadModel = new Models.PropiedadModel();
            DataTable clientesDataTable = propiedadModel.GetPropiedades();
            Entities.PropiedadEntitie datosPropiedad = new Entities.PropiedadEntitie();
            datosPropiedad.PropiedadDB = clientesDataTable;
            return View(datosPropiedad);
        }

        public JsonResult GetUsuarios(string IdPropiedad)
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            DataTable datosPropiedades = model.GetUsuarios(IdPropiedad);
            return Json(datosPropiedades);
        }
    }
}