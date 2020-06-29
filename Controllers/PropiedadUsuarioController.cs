using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropiedadUsuarioController : Controller
    {
        public IActionResult Index()
        {
            Models.UsuarioModel Model = new Models.UsuarioModel();
            DataTable datos = Model.GetUsuario();
            Entities.UsuarioEntitie Entitie = new Entities.UsuarioEntitie();
            Entitie.UsuarioDB = datos;
            return View(Entitie);
        }


        public JsonResult GetPropiedades(string IdCliente)
        {
            Models.UsuarioModel model = new Models.UsuarioModel();
            DataTable datosPropiedades = model.GetPropiedad(IdCliente);
            return Json(datosPropiedades);
        }
    }
}