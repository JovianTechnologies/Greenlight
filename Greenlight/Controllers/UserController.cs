using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Greenlight.CustomAttributes;

namespace Greenlight.Controllers
{
    public class UserController : Controller
    {
        // GET: User
//        public ActionResult Index()
//        {
//            return View();
//        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Models.User user)
        {
            if (ModelState.IsValid)
            {
                if (user.IsValid())
                {
                    FormsAuthentication.SetAuthCookie(user.Username, true);
                    return RedirectToAction("Index", "Home");
                }
                    
            }

            ModelState.AddModelError("", "Login data is incorrect");
            return View(user);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }
    }
}