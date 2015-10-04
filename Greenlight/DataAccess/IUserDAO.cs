using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Greenlight.DataAccess
{
    public interface IUserDao
    {
        bool ValidateUser(string username, string password);
    }
}