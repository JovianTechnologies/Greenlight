using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Greenlight.Data;
using Greenlight.DataAccess;
using Greenlight.DataAccess.Impl;

namespace Greenlight.Models
{
    public class User
    {
        private readonly IUserDao _userDao = new UserMongoDao();

        [Required]
        [Display(Name = "User name")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Role Role { get; set; }

        public Guid Id { get; set; }

        /// <summary>
        /// Check if the user exists, and has the proper credentials
        /// </summary>
        /// <returns>boolean</returns>
        public bool IsValid()
        {
            var result = _userDao.ValidateUserAsync(Username, Password);

            result.Wait();
            HttpContext.Current.Session["role"] = result.Result.Role;
            return result.Result.IsValid;
        }
    }
}