using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Greenlight.Data;

namespace Greenlight.DataAccess.Impl
{
    public class UserMockDao : IUserDao
    {
        public bool ValidateUser(string username, string password)
        {
            return UserData.Users.ContainsKey(username) && UserData.Users[username] == password;
        }
    }
}