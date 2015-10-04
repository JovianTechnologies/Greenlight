using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Greenlight.Controllers
{
    public class ViewDataController : Controller
    {
        // GET: ViewData
        public ActionResult Index()
        {
            return View();
        }
    }
}