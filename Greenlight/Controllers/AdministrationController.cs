using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Greenlight.Biz;
using Greenlight.Biz.Impl;
using Greenlight.CustomAttributes;
using Greenlight.Models;

namespace Greenlight.Controllers
{
    public class AdministrationController : Controller
    {
        private readonly ICompanyBizManager _companyBizManager= new CompanyBizManager();
        private readonly IUserBizManager _userBizManager = new UserBizManager();
        //
        // GET: /Administration/Company
        [RoleAuthorize(Roles = "Management,Administrator")]
        public ActionResult Company()
        {
            var user = System.Web.HttpContext.Current.Session["currentuser"] as User;
            var company = _companyBizManager.GetCompany(new Company(){Id = user.Company});

            return View(company);
        }


        [HttpPost]
        [RoleAuthorize(Roles = "Management,Administrator")]
        public ActionResult UpdateCompany(Company org)
        {
            _companyBizManager.UpdateCompany(org);
            return RedirectToAction("Company");
        }

        [RoleAuthorize(Roles = "Management,Administrator")]
        public ActionResult Users()
        {
            var users = _userBizManager.GetUsers();
            var uvm = new UsersViewModel();
            uvm.Users = users;
            return View(uvm);
        }

        [RoleAuthorize(Roles = "Management,Administrator")]
        public ActionResult User(User user)
        {
            if(user == null) user = new User();

            return View(user);
        }

        [RoleAuthorize(Roles = "Management,Administrator")]
        public ActionResult SaveUser(User user)
        {
            if (user.Id == null)
            {
                _userBizManager.CreateUser(user);
            }
            else
            {
                _userBizManager.UpdateUser(user);
            }

            return RedirectToAction("Users");
        }

        [RoleAuthorize(Roles = "Management,Administrator")]
        public ActionResult DeleteUser(User user)
        {
            _userBizManager.DeleteUser(user);

            return RedirectToAction("Users");
        }

        [RoleAuthorize(Roles = "Management,Administrator")]
        public ActionResult Analyze(User user)
        {

            return View();
        }
	}

    public class UsersViewModel
    {
        public UsersViewModel()
        {
            
        }

        public List<User> Users { get; set; }

        public User User { get; set; }
    }

    
}