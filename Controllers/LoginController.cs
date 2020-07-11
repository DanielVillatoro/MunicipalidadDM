using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MunicipalidadDM.Models;
using Newtonsoft.Json;
//using ExosData.Entities;

namespace MunicipalidadDM.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LoginUser(string username, string pass)
        {
            LoginModel modeloLogin = new LoginModel();
            DataTable dtResultado = modeloLogin.ValidacionLogin(username, pass);
            if (dtResultado.Rows.Count>0)
            {
                HttpContext.Session.SetString("TipoUsuario", dtResultado.Rows[0]["tipo"].ToString());
                HttpContext.Session.SetString("IdUsuario", dtResultado.Rows[0]["id"].ToString());
                HttpContext.Session.SetString("NombreUsuario", dtResultado.Rows[0]["nombre"].ToString());
                return RedirectToAction("Index", "Inicio");
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
    }
}