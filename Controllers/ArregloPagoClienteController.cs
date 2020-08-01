using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class ArregloPagoClienteController : Controller
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

        public JsonResult GetAP(string idPropiedad)
        {
            Models.ArregloPagoClienteModel model = new Models.ArregloPagoClienteModel();
            DataTable datos = model.GetAP(idPropiedad);
            return Json(datos);
        }

        public JsonResult GetMov(string idAP)
        {
            Models.ArregloPagoClienteModel model = new Models.ArregloPagoClienteModel();
            DataTable datos = model.GetMov(idAP);
            return Json(datos);
        }
    }
}