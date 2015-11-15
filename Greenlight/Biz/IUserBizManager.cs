using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Greenlight.Models;

namespace Greenlight.Biz
{
    interface IUserBizManager
    {
        bool ValidateUser(User user);
        User GetUser(User user);
        List<User> GetUsers();
        User CreateUser(User user);
        User UpdateUser(User user);
        void DeleteUser(User user);
    }
}
