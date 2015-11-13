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

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Company { get; set; }

        public Role? Role { get; set; }

        public String Id { get; set; }
    }
}