using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Greenlight.DataAccess;
using Greenlight.DataAccess.Impl;
using Greenlight.Models;

namespace Greenlight.Biz.Impl
{
    public class CompanyBizManager : ICompanyBizManager
    {
        private readonly ICompanyDao _companyDao = new CompanyMongoDao();

        public Company GetCompany(Company company)
        {
            var companyResult = _companyDao.GetCompany(company);
            companyResult.Wait();
            company = companyResult.Result;

            HttpContext.Current.Session["currentcompany"] = company;
            return company;
        }

        public Company UpdateCompany(Company company)
        {
            var updatedCompany = _companyDao.UpdateCompany(company);
            updatedCompany.Wait();
            HttpContext.Current.Session["currentcompany"] = company;
            return company; 
        }
    }
}