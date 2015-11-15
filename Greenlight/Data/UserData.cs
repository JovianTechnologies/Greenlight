using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Greenlight.Models;

namespace Greenlight.Data
{
    public static class UserData
    {
        public static readonly Dictionary<string, Tuple<string, Role>> Users = new Dictionary<string, Tuple<string, Role>>()
        {
            {"easwsm", new Tuple<string, Role>("nanjing1", Role.Consumer)},
            {"testuser", new Tuple<string, Role>("testpass", Role.Administrator)}
        };
    }
}