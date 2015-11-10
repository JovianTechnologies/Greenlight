using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Greenlight.Data;
using Greenlight.Models;

namespace Greenlight.DataAccess.Impl
{
    public class UserMockDao : IUserDao
    {
        public bool ValidateUser(string username, string password)
        {
            var isValid = UserData.Users.ContainsKey(username) && UserData.Users[username].Item1 == password;

            if (isValid)
            {
                HttpContext.Current.Session["role"] = Enum.GetName(typeof (Role), (int) UserData.Users[username].Item2);
            }

            return isValid;
        }

        public Task<UserValidationResult> ValidateUserAsync(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}