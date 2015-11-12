using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Greenlight.Models;

namespace Greenlight.Biz
{
    interface ICompanyBizManager
    {
        Company GetCompany();

        Company UpdateCompany(Company company);
    }
}
