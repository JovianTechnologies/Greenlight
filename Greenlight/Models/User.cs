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
        [Required]
        [Display(Name = "User name")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Display(Name = "E-mail Address")]
        public string Email { get; set; }

        public string Company { get; set; }

        [Display(Name = "Role")]
        public Role? Role { get; set; }

        [Display(Name = "")]
        public String Id { get; set; }
    }
}