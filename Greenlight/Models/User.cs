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
        private readonly IUserDao _userDao = new UserMockDao();

        [Required]
        [Display(Name = "User name")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        /// <summary>
        /// Check if the user exists, and has the proper credentials
        /// </summary>
        /// <returns>boolean</returns>
        public bool IsValid(string username, string password)
        {
            return _userDao.ValidateUser(username, password);
        }

    }
}