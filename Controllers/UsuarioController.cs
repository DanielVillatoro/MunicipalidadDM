using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            Models.UsuarioModel Model = new Models.UsuarioModel();
            DataTable datos = Model.GetUsuario();
            Entities.UsuarioEntitie Entitie = new Entities.UsuarioEntitie();
            Entitie.UsuarioDB = datos;
            return View(Entitie);
        }

        public int AddUser(string Usuario, string Contrasena, string Rol)
        {
            Models.UsuarioModel Model = new Models.UsuarioModel();
            Model.AddUsuario(Usuario, Contrasena, Rol);
            return 1;
        }

        public int EditUser(int Id, string Usuario, string Contrasena, string Rol)
        {
            Models.UsuarioModel Model = new Models.UsuarioModel();
            Model.ActualizaUsuario(Id,Usuario,Contrasena,Rol,0);
            return 1;
        }

        public int DeleteUser(int Id)
        {
            Models.UsuarioModel Model = new Models.UsuarioModel();
            Model.ActualizaUsuario(Id, "nulo", "nulo", "nulo", 1);
            return 1;
        }
    }
}