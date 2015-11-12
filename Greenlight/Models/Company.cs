using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Greenlight.DataAccess;
using Greenlight.DataAccess.Impl;

namespace Greenlight.Models
{
    public class Company
    {
        public string Id { get; set; }

        [Display(Name = "Company Name")]
        public string Name { get; set; }

        [Display(Name = "Address 1")]
        public string Address1 { get; set; }

        [Display(Name = "Address 2")]
        public string Address2 { get; set; }

        [Display(Name = "City")]
        public string City { get; set; }

        [Display(Name = "State/Zip")]
        public string StateZip{ get; set; }

        [Display(Name = "Country")]
        public string Country{ get; set; }

        [Display(Name = "Contact Name")]
        public string Contact{ get; set; }

        [Display(Name = "E-Mail Address")]
        public string Email{ get; set; }

        [Display(Name = "Phone Number")]
        public string PhoneNumber{ get; set; }

        [Display(Name = "Company Logo")]
        public HttpPostedFileBase Logo { get; set; }

        public byte[] LogoBytes { get; set; }
    }
}