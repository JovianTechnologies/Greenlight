﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Greenlight.CustomAttributes;

namespace Greenlight.Controllers
{
    public class CaptureController : Controller
    {
        // GET: Capture
        [RoleAuthorize(Roles = "Management,Reporter")]
        public ActionResult Index()
        {
            return View();
        }
    }
}