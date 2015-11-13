using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Greenlight
{
    public class Constants
    {
        public readonly static Regex IdRegex= new Regex(Regex.Escape("\"") + "[^" + Regex.Escape("\\") + "]" + "[A-Za-z0-9_-]*");
    }
}