using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Greenlight.Controllers
{
    public class AdministrationController : Controller
    {
        //
        // GET: /Administration/Company
        public ActionResult Company()
        {
            return View();
        }

        public ActionResult Users()
        {
            return View();
        }
	}
}