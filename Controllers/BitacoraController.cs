using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class BitacoraController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetBitacora(string idEntidad,string fecha1,string fecha2)
        {
            Models.BitacoraModel model = new Models.BitacoraModel();
            DataTable datos = model.GetBitacora(idEntidad, fecha1, fecha2);//Convert.ToDateTime(fecha1),Convert.ToDateTime(fecha1));
            return Json(datos);
        }
    }
}