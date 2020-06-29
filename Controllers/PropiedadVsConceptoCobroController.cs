using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropiedadVsConceptoCobroController : Controller
    {
        public IActionResult Index()
        {
            Models.PropiedadModel propiedadModel = new Models.PropiedadModel();
            DataTable clientesDataTable = propiedadModel.GetPropiedades();
            Entities.PropiedadEntitie datosPropiedad = new Entities.PropiedadEntitie();
            datosPropiedad.PropiedadDB = clientesDataTable;
            return View(datosPropiedad);
        }

        public JsonResult GetConceptos(string IdCC)
        {
            Models.PropiedadVsConceptoCobroModel model = new Models.PropiedadVsConceptoCobroModel();
            DataTable datosPropiedades = model.GetConceptos(IdCC);
            return Json(datosPropiedades);
        }

        public int AddRelacion(string IdPropietario, string IdPropiedad)
        {
            Models.PropiedadVsConceptoCobroModel Model = new Models.PropiedadVsConceptoCobroModel();
            Model.AddRelacion(Convert.ToInt32(IdPropietario), Convert.ToInt32(IdPropiedad));
            return 1;
        }

        public int DeleteRelacion(string IdPropietario, string IdPropiedad)
        {
            Models.PropiedadVsConceptoCobroModel Model = new Models.PropiedadVsConceptoCobroModel();
            Model.EliminaRelacion(Convert.ToInt32(IdPropietario), Convert.ToInt32(IdPropiedad));
            return 1;
        }

        public JsonResult GetAllConceptos()
        {
            Models.PropiedadVsConceptoCobroModel propiedad = new Models.PropiedadVsConceptoCobroModel();
            return Json(propiedad.GetAllConceptos());
        }
    }
}