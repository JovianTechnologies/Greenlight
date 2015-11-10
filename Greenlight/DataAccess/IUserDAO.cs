using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Greenlight.Models;

namespace Greenlight.DataAccess
{
    public interface IUserDao
    {
        bool ValidateUser(string username, string password);

        Task<UserValidationResult> ValidateUserAsync(string username, string password);
    }
}