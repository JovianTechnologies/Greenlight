using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Greenlight.CustomAttributes;

namespace Greenlight.Controllers
{
    public class CorrectDataController : Controller
    {
        // GET: CorrectData
        [RoleAuthorize(Roles = "Mangager,Reporter")]
        public ActionResult Index()
        {
            return View();
        }
    }
}