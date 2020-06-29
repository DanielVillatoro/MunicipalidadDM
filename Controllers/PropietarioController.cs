using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
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
            Model.AddPropietario(Nombre, NumDoc, TipoDoc);
            return 1;
        }

        public int EditPropietario(int Id, string Nombre, string NumDoc, string TipoDoc)
        {
            Models.PropietarioModel Model = new Models.PropietarioModel();
            Model.ActualizaPropietario(Id, Nombre, NumDoc, TipoDoc, 0);
            return 1;
        }

        public int DeletePropietario(int Id)
        {
            Models.PropietarioModel Model = new Models.PropietarioModel();
            Model.ActualizaPropietario(Id, "nulo", "0", "0", 1);
            return 1;
        }
    }
}