using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Greenlight.CustomAttributes;
using Greenlight.Models;
using Microsoft.Ajax.Utilities;

namespace Greenlight.Controllers
{
    public class HomeController : Controller
    {
        [RoleAuthorize(Roles = "Management,Administrator,Reporter,Consumer")]
        public ActionResult Index()
        {
            return View();
        }
    }
}