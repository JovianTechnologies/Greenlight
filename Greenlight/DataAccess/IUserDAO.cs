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
        bool GetUser(User user);

        Task<UserValidationResult> GetUsersAsync(User user);

        Task<UserValidationResult> CreateUserAsync(User user);

        Task<User> UpdateUserAsync(User user);

        Task<bool> DeleteUserAsync(User user);
    }
}