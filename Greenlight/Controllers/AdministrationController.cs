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
        //
        // GET: /Administration/Company
        public ActionResult Company()
        {
            var company = _companyBizManager.GetCompany();

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
            return View();
        }
	}
}