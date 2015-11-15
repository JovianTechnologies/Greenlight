using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;

namespace Greenlight.CustomAttributes
{
    public class RoleAuthorizeAttribute : AuthorizeAttribute
    {     
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            string[] roles = Roles.Split(',').Select(a => a.Trim()).ToArray();

            if (!httpContext.User.Identity.IsAuthenticated) 
                return false;

            if (httpContext.Session == null)
                return false;

            if (roles.Length > 0 && !roles.Contains(httpContext.Session["role"]))
            {
                FormsAuthentication.SignOut();
                return false;
            }

            return true;
        }
    }
}