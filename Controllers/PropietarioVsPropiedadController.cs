using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropietarioVsPropiedadController : Controller
    {
        public IActionResult Index()
        {
            Models.PropietarioModel propietarioModel = new Models.PropietarioModel();
            DataTable clientesDataTable = propietarioModel.GetPropietarios();
            Entities.PropietarioEntitie datosPropietario = new Entities.PropietarioEntitie();
            datosPropietario.PropietarioDB = clientesDataTable;
            return View(datosPropietario);
        }

        public int AddRelacion(string IdPropietario, string IdPropiedad)
        {
            Models.PropietarioVsPropiedadModel Model = new Models.PropietarioVsPropiedadModel();
            Model.AddRelacion(Convert.ToInt32(IdPropietario), Convert.ToInt32(IdPropiedad));
            return 1;
        }

        public int DeleteRelacion(string IdPropietario,string IdPropiedad)
        {
            Models.PropietarioVsPropiedadModel Model = new Models.PropietarioVsPropiedadModel();
            Model.EliminaRelacion(Convert.ToInt32(IdPropietario), Convert.ToInt32(IdPropiedad));
            return 1;
        }

        public JsonResult GetPropiedades()
        {
            Models.PropiedadModel propiedad = new Models.PropiedadModel();
            return Json(propiedad.GetPropiedades());
        }
    }
}