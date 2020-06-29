using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MunicipalidadDM.Models;

namespace MunicipalidadDM.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public DataTable GetUsuario()
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("SELECT * FROM dbo.Usuario"), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }
    }
}
