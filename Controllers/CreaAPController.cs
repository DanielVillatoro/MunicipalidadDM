using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class CreaAPController : Controller
    {
        public IActionResult Index()
        {
            Models.UsuarioModel Model = new Models.UsuarioModel();
            DataTable datos = Model.GetUsuario();
            Entities.UsuarioEntitie Entitie = new Entities.UsuarioEntitie();
            Entitie.UsuarioDB = datos;
            return View(Entitie);
        }

        public JsonResult GetRecibos(string IdCliente,string IdProp)
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            DataTable datos = model.GetRecibos(IdCliente, IdProp);
            return Json(datos);
        }

        public JsonResult getTotalAP(string JsonTotalPago,string Plazo)
        {
            Models.CreaAPModel model = new Models.CreaAPModel();
            DataTable datos = model.GetMonto(JsonTotalPago,Convert.ToInt32(Plazo));
            return Json(datos);
        }

        public string CrearAP(string JsonTotalPago, string Plazo)
        {
            Models.CreaAPModel model = new Models.CreaAPModel();
            DataTable datos = model.creaAp(JsonTotalPago, Convert.ToInt32(Plazo));
            return "1";
        }
    }
}