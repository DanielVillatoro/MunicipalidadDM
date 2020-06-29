using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class PropiedadController : Controller
    {
        public IActionResult Index()
        {
            Models.PropiedadModel propiedadModel = new Models.PropiedadModel();
            DataTable clientesDataTable = propiedadModel.GetPropiedades();
            Entities.PropiedadEntitie datosPropiedad = new Entities.PropiedadEntitie();
            datosPropiedad.PropiedadDB = clientesDataTable;
            return View(datosPropiedad);
        }

        public int AddPropiedad(string NumFinca,string Direccion,string Valor)
        {
            Direccion = Direccion.Replace(" ", "_");
            Models.PropiedadModel Model = new Models.PropiedadModel();
            Model.AddPropiedad(NumFinca,Valor,Direccion);
            return 1;
        }

        public int EditPropiedad(int Id, string NumFinca, string Direccion, string Valor)
        {
            Models.PropiedadModel Model = new Models.PropiedadModel();
            Model.ActualizaPropiedad(Id, NumFinca, Direccion, Valor, 0);
            return 1;
        }

        public int DeletePropiedad(int Id)
        {
            Models.PropiedadModel Model = new Models.PropiedadModel();
            Model.ActualizaPropiedad(Id, "nulo", "nulo", "0", 1);
            return 1;
        }
    }
}