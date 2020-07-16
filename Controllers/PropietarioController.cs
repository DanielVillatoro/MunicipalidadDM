using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropietarioController : Controller
    {
        public IActionResult Index()
        {
            Models.PropietarioModel propietarioModel = new Models.PropietarioModel();
            DataTable clientesDataTable = propietarioModel.GetPropietarios();
            Entities.PropietarioEntitie datosPropietario = new Entities.PropietarioEntitie();
            datosPropietario.PropietarioDB = clientesDataTable;
            return View(datosPropietario);
        }

        public JsonResult GetDocs()
        {
            Models.PropietarioModel propietarioModel = new Models.PropietarioModel();
            return Json(propietarioModel.GetDocs());
        }

        public int AddPropietario(string Nombre,string NumDoc,string TipoDoc)
        {
            Nombre = Nombre.Replace(" ", "_");
            Models.PropietarioModel Model = new Models.PropietarioModel();
            string DateString = DateTime.Today.ToString("yyyy-MM-dd");
            string idUsuario = HttpContext.Session.GetString("NombreUsuario");
            string ipUsuario = HttpContext.Session.GetString("IpUsuario");
            Model.AddPropietario(Nombre, NumDoc, TipoDoc, DateString, idUsuario, ipUsuario);
            return 1;
        }

        public int EditPropietario(int Id, string Nombre, string NumDoc, string TipoDoc)
        {
            Models.PropietarioModel Model = new Models.PropietarioModel();
            string DateString = DateTime.Today.ToString("yyyy-MM-dd");
            string idUsuario = HttpContext.Session.GetString("NombreUsuario");
            string ipUsuario = HttpContext.Session.GetString("IpUsuario");
            Model.ActualizaPropietario(Id, Nombre, NumDoc, TipoDoc, 0, DateString, idUsuario, ipUsuario);
            return 1;
        }

        public int DeletePropietario(int Id)
        {
            Models.PropietarioModel Model = new Models.PropietarioModel();
            string DateString = DateTime.Today.ToString("yyyy-MM-dd");
            string idUsuario = HttpContext.Session.GetString("NombreUsuario");
            string ipUsuario = HttpContext.Session.GetString("IpUsuario");
            Model.ActualizaPropietario(Id, "nulo", "0", "0", 1, DateString, idUsuario, ipUsuario);
            return 1;
        }
    }
}