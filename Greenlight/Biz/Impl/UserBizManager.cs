using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Greenlight.DataAccess;
using Greenlight.DataAccess.Impl;
using Greenlight.Models;

namespace Greenlight.Biz.Impl
{
    public class UserBizManager : IUserBizManager
    {
        private readonly IUserDao _userDao = new UserMongoDao();
        private readonly ICompanyBizManager _companyBizManager = new CompanyBizManager();

        public bool ValidateUser(User user)
        {
            user.Role = null;
            var result = _userDao.GetUserAsync(user);

            result.Wait();
            if (result.Result.IsValid)
            {
                HttpContext.Current.Session["role"] = Enum.GetName(typeof (Role), result.Result.User.Role);
                HttpContext.Current.Session["currentuser"] = result.Result.User;

                var company = new Company() {Id = user.Company};
                company = _companyBizManager.GetCompany(company);
                HttpContext.Current.Session["currentcompany"] = company;
            }

            return result.Result.IsValid;
        }

        public User GetUserAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}