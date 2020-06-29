using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class SPXMLController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public void TipoDoc()
        {
            Models.SPXMLModel sp = new Models.SPXMLModel();
            sp.TipoDoc();
        }
        public void ConceptosCobro()
        {
            Models.SPXMLModel sp = new Models.SPXMLModel();
            sp.ConceptosCobro();
        }
        public void Operaciones()
        {
            Models.SPXMLModel sp = new Models.SPXMLModel();
            sp.Operaciones();
        }
    }
}