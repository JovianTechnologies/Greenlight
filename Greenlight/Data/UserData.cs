using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Greenlight.Data
{
    public static class UserData
    {
        public static readonly Dictionary<string, string> Users = new Dictionary<string, string>()
        {
            {"easwsm", "nanjing1"},
            {"testuser", "testpass"}
        };
    }
}