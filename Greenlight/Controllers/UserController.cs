using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Greenlight.Biz;
using Greenlight.Biz.Impl;
using Greenlight.CustomAttributes;

namespace Greenlight.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserBizManager _userBizManager = new UserBizManager();

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
                if (_userBizManager.ValidateUser(user))
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