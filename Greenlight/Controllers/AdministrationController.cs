using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Greenlight.Biz;
using Greenlight.Biz.Impl;
using Greenlight.Models;

namespace Greenlight.Controllers
{
    public class AdministrationController : Controller
    {
        private readonly ICompanyBizManager _companyBizManager= new CompanyBizManager();
        private readonly IUserBizManager _userBizManager = new UserBizManager();
        //
        // GET: /Administration/Company
        public ActionResult Company()
        {
            var user = System.Web.HttpContext.Current.Session["currentuser"] as User;
            var company = _companyBizManager.GetCompany(new Company(){Id = user.Company});

            return View(company);
        }


        [HttpPost]
        public ActionResult UpdateCompany(Company org)
        {
            _companyBizManager.UpdateCompany(org);
            return RedirectToAction("Company");
        }

        public ActionResult Users()
        {
            var users = _userBizManager.GetUsers();
            var uvm = new UsersViewModel();
            uvm.Users = users;
            return View(uvm);
        }
	}

    public class UsersViewModel
    {
        public UsersViewModel()
        {
            
        }

        public List<User> Users { get; set; } 
    }
}