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
      
        public Task<UserValidationResult> ValidateUserAsync(string username, string password)
        {
            throw new NotImplementedException();
        }

        public bool GetUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<UserValidationResult> GetUsersAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<UserValidationResult> CreateUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteUserAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}