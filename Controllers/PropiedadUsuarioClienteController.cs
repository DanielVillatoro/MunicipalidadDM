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
            DataTable datos = model.GetRecibos(idUsuario, idPropiedad);
            return Json(datos);
        }

        public JsonResult GetComprobantes(string idRecibo)
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            DataTable datos = model.GetComprobante(idRecibo);
            return Json(datos);
        }

        public string GetTotalPago(string JsonTotalRecibo, string JsonTotalPago)
        {
            JsonResult elementoTotalRecibo = Json(JsonTotalRecibo);
            JsonResult elementoTotalPago= Json(JsonTotalPago);
            Models.UsuarioModel model = new Models.UsuarioModel();
            DataTable datos = model.GetMontoTotal(JsonTotalPago.ToString());
            return datos.Rows[0]["montoTotal"].ToString();
        }

        public JsonResult GetCP(string idPropiedad)
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            DataTable datos = model.GetCP(idPropiedad);
            return Json(datos);
        }

        public JsonResult GetRecibosCP(string idCP)
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            DataTable datos = model.GetRecibosCP(idCP);
            return Json(datos);
        }
        
    }
}