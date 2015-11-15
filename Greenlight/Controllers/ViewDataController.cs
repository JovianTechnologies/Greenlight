using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Greenlight.CustomAttributes;

namespace Greenlight.Controllers
{
    public class ViewDataController : Controller
    {
        // GET: ViewData
        [RoleAuthorize(Roles = "Management,Reporter,Consumer")]
        public ActionResult Index()
        {
            return View();
        }

        //settings
        [RoleAuthorize(Roles = "Management,Reporter")]
        public ActionResult Settings() 
        {
            return View();
        }

        public ActionResult Analyze()
        {
            return View();
        }
    }
}