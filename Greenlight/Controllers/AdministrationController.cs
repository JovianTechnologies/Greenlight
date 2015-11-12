using System;
using System.Collections.Generic;
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
            var modelstate = ModelState.IsValid;
            var file = Request.Files["companyLogo"];
            byte[] fileBytes;
            if (file != null)
            {
                fileBytes = new byte[file.ContentLength];
                file.InputStream.Read(fileBytes, 0, file.ContentLength);
                org.Logo = fileBytes;

            }

            _companyBizManager.UpdateCompany(org);
            return RedirectToAction("Company");
        }

        public ActionResult Users()
        {
            return View();
        }
	}
}