using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Greenlight.Models
{
    public class UserValidationResult
    {
        public User User { get; set; }
        public bool IsValid { get; set; }
    }
}