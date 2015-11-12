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

        public Company GetCompany()
        {
            var company = new Company();
            var companyResult = _companyDao.GetCompany();
            companyResult.Wait();
            company.Id = companyResult.Result.Id;
            company.Name = companyResult.Result.Name;
            company.Address1 = companyResult.Result.Address1;
            company.Address2 = companyResult.Result.Address2;
            company.City = companyResult.Result.City;
            company.StateZip = companyResult.Result.StateZip;
            company.Country = companyResult.Result.Country;
            company.Contact = companyResult.Result.Contact;
            company.Email = companyResult.Result.Email;
            company.PhoneNumber = companyResult.Result.PhoneNumber;

            return company;
        }

        public Company UpdateCompany(Company company)
        {
            var updatedCompany = _companyDao.UpdateCompany(company);
            updatedCompany.Wait();
            return company; 
        }
    }
}