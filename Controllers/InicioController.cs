﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MunicipalidadDM.Controllers
{
    public class InicioController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
                return View();
        }
    }
}