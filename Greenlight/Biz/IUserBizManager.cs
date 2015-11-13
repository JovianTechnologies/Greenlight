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
        User GetUserAsync(User user);
    }
}
