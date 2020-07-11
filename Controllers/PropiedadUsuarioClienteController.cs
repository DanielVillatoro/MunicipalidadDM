using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropiedadUsuarioClienteController : Controller
    {
        public IActionResult Index()
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            string idUsuario = HttpContext.Session.GetString("IdUsuario");
            DataTable datosPropiedades = model.GetPropiedad(idUsuario);
            Entities.ClienteEntitie Entitie = new Entities.ClienteEntitie();
            Entitie.Propiedades = datosPropiedades;
            return View(Entitie);
        }

        public JsonResult GetRecibos(string idPropiedad)
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            string idUsuario = HttpContext.Session.GetString("IdUsuario");
            DataTable datosPropiedades = model.GetRecibos(idUsuario, idPropiedad);
            return Json(datosPropiedades);
        }
    }
}